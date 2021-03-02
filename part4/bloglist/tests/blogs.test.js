const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('returned blog identifiers are named id, not _id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

describe('adding a new blog', () => {
  test('increases the number of blogs by one, and saves content correctly', async () => {
    await api
      .post('/api/blogs')
      .send(helper.newBlog)
      .expect(201)
      .expect('Content-type', /application\/json/)

    const response = await api.get('/api/blogs')
    const contents = response.body.map(blog => {
      const { title, author, url, likes } = blog
      return { title, author, url, likes }
    })
    const { title, author, url, likes } = helper.newBlog

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(contents).toContainEqual({ title, author, url, likes })
  })

  test('missing likes defaults the value to 0', async () => {
    await api
      .post('/api/blogs')
      .send(helper.missingLikes)
      .expect(201)
      .expect('Content-type', /application\/json/)
    
    const response = await api.get('/api/blogs')
    const savedBlog = response.body.find(blog => {
      return blog.title === helper.missingLikes.title
    })
    
    expect(savedBlog).toHaveProperty('likes', 0)
  })
})

afterAll(() => {
  mongoose.connection.close()
})