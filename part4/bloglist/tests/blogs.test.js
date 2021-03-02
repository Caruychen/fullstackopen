const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const { initialBlogs, newBlog, missingLikes, missingTitleAndUrl } = require('./test_helper')

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

    const response = await api.get('/api/blogs')
    const contents = response.body.map(blog => {
      const { title, author, url, likes } = blog
      return { title, author, url, likes }
    })
    const { title, author, url, likes } = newBlog

    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(contents).toContainEqual({ title, author, url, likes })
  })

  test('missing likes defaults the value to 0', async () => {
    await api
      .post('/api/blogs')
      .send(missingLikes)
      .expect(201)
      .expect('Content-type', /application\/json/)
    
    const response = await api.get('/api/blogs')
    const savedBlog = response.body.find(blog => {
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

afterAll(() => {
  mongoose.connection.close()
})