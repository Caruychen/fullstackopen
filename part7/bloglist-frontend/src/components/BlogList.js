import React from 'react'
import Blog from './Blog'
import { useDispatch, useSelector } from 'react-redux'
import { updateBlog, deleteBlog } from '../reducers/blogsReducer'

const BlogList = ({ username }) => {
  const blogs = useSelector(state => {
    return [...state.blogs].sort((blog1, blog2) => blog2.likes - blog1.likes)
  })
  const dispatch = useDispatch()

  const incrementBlog = (blog) => () => dispatch(updateBlog(blog))

  const handleDelete = (blogToDelete) => () => dispatch(deleteBlog(blogToDelete))

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