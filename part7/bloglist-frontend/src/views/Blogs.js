import React, { useRef } from 'react'
import BlogList from '../components/BlogList'
import BlogForm from '../components/BlogForm'
import Togglable from '../components/Togglable'

const Blogs = ({ profile }) => {
  const blogFormRef = useRef()
  return (
    <div>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm handleToggle={() => blogFormRef.current.toggleVisibility()} />
      </Togglable>
      <BlogList username={profile.username} />
    </div>
  )
}

export default Blogs