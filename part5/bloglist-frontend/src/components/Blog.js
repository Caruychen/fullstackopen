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
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleDetails}>{showDetails ? 'hide' : 'view'}</button>
      {showDetails &&
        <div>
          {blog.url}
          <br />
          {blog.likes}<button onClick={handleUpdate(blog)}>like</button>
          <br />
          {blog.user.name}
          <br />
          {blog.user.username === username && <button onClick={handleDelete(blog)}>remove</button>}
        </div>
      }
    </div>
  )
}

export default Blog
