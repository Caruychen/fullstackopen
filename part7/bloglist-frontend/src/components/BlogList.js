import React from 'react'
import Blog from './Blog'
import { useDispatch, useSelector } from 'react-redux'
import { updateBlog, deleteBlog } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogList = ({ username }) => {
  const blogs = useSelector(state => {
    return [...state.blogs].sort((blog1, blog2) => blog2.likes - blog1.likes)
  })

  const dispatch = useDispatch()

  const incrementBlog = (blog) => () => {
    try {
      dispatch(updateBlog(blog))
    }
    catch (exception) {
      dispatch(setNotification('error', exception.response.data.error))
    }
  }

  const handleDelete = (blogToDelete) => () => {
    try {
      dispatch(deleteBlog(blogToDelete))
      dispatch(setNotification('success', `Removed blog ${blogToDelete.title} by ${blogToDelete.author}`))
    }
    catch (exception) {
      dispatch(setNotification('error', exception.response.data.error))
    }
  }

  return (
    <div>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleUpdate={incrementBlog(blog)}
          handleDelete={handleDelete(blog)}
          username={username} />
      )}
    </div>
  )
}

export default BlogList