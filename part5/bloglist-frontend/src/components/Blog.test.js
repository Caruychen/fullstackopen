import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  title: 'Test title',
  author: 'John Smith',
  url: 'http://www.testurl.com',
  likes: 0,
  user: {
    username: 'caruychen',
    name: 'Caruy',
  }
}

test('renders title and author, and does not display details by default', () => {
  const component = render(<Blog blog={blog} />)
  const blogHtml = component.container.querySelector('.blog')
  const blogDetails = component.container.querySelector('.blogDetails')
  expect(blogHtml).toHaveTextContent('Test title John Smith')
  expect(blogHtml).not.toContainElement(blogDetails)
})
