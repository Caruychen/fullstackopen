import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import Comments from '../components/Comments'
import { updateBlog, deleteBlog } from '../reducers/blogsReducer'

const Blog = ({ blog, profileUsername }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleUpdate = () => dispatch(updateBlog(blog))
  const handleDelete = () => {
    dispatch(deleteBlog(blog))
    history.push('/')
  }

  if (!blog) return null
  return (
    <div className="blog">
      <h2>{blog.title}</h2>
      <div className="blogDetails">
        <div className="blogUrl">
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div className="blogLikes">
          {blog.likes}<button onClick={handleUpdate}>like</button>
        </div>
        <div className="blogUser">
          added by {blog.user.name}
          {blog.user.username === profileUsername && <button onClick={handleDelete}>remove</button>}
        </div>
      </div>
      <Comments comments={blog.comments}/>
    </div>
  )
}

export default Blog