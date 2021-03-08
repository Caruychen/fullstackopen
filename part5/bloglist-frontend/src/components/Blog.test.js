import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
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

describe('<Blog />', () => {
  let component
  const mockUpdate = jest.fn()
  const mockDelete = jest.fn()
  const username = 'caruychen'

  beforeEach(() => {
    component = render(<Blog blog={blog} handleUpdate={mockUpdate} handleDelete={mockDelete} username={username} />)
  })

  test('renders title and author, and does not display details by default', () => {
    const blogHtml = component.container.querySelector('.blog')
    const blogDetails = component.container.querySelector('.blogDetails')
    expect(blogHtml).toHaveTextContent('Test title John Smith')
    expect(blogHtml).not.toContainElement(blogDetails)
  })

  test('after clicking the button, details are displayed', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const blogUrl = component.container.querySelector('.blogUrl')
    const blogLikes = component.container.querySelector('.blogLikes')

    expect(mockUpdate.mock.calls).toHaveLength(1)
    expect(blogUrl).toHaveTextContent(blog.url)
    expect(blogLikes).toHaveTextContent(blog.likes)
  })
})