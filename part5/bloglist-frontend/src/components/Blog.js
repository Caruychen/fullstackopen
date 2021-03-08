import React, { useState } from 'react'

const Blog = ({ blog, handleUpdate, handleDelete, username }) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  return (
    <div style={blogStyle} className="blog">
      {blog.title} {blog.author}
      <button onClick={toggleDetails}>{showDetails ? 'hide' : 'view'}</button>
      {showDetails &&
        <div className="blogDetails">
          <div className="blogUrl">
            {blog.url}
          </div>
          <div className="blogLikes">
            {blog.likes}<button onClick={handleUpdate(blog)}>like</button>
          </div>
          <div className="blogUser">
            {blog.user.name}
            {blog.user.username === username && <button onClick={handleDelete(blog)}>remove</button>}
          </div>
        </div>
      }
    </div>
  )
}

export default Blog
