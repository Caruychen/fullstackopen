const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const { initialBlogs, newBlog, missingLikes, missingTitleAndUrl, blogsInDb } = require('./test_helper')

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
})

test('returned blog identifiers are named id, not _id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

describe('adding a new blog', () => {
  test('increases the number of blogs by one, and saves content correctly', async () => {
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-type', /application\/json/)

    const response = await blogsInDb()
    const contents = response.map(blog => {
      const { title, author, url, likes } = blog
      return { title, author, url, likes }
    })
    const { title, author, url, likes } = newBlog

    expect(response).toHaveLength(initialBlogs.length + 1)
    expect(contents).toContainEqual({ title, author, url, likes })
  })

  test('missing likes defaults the value to 0', async () => {
    await api
      .post('/api/blogs')
      .send(missingLikes)
      .expect(201)
      .expect('Content-type', /application\/json/)
    
    const response = await blogsInDb()
    const savedBlog = response.find(blog => {
      return blog.title === missingLikes.title
    })

    expect(savedBlog).toHaveProperty('likes', 0)
  })

  test('missing title and url gets a 400 response', async () => {
    await api
      .post('/api/blogs')
      .send(missingTitleAndUrl)
      .expect(400)
  })
})

describe('deleting a blog', () => {
  test('succeeds with a status of 204 if the id is valid', async () => {
    const blogsAtStart = await blogsInDb()
    const blogToDelete = blogsAtStart[0]
    
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
    
    const blogsAtEnd = await blogsInDb()

    expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1)

    const titles = blogsAtEnd.map(blog => blog.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

afterAll(() => {
  mongoose.connection.close()
})