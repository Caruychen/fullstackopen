import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import './App.css'
import { initializeBlogs } from './reducers/blogsReducer'
import { setUser, logoutUser } from './reducers/userReducer'

const App = () => {
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(setUser(user))
    }
  }, [dispatch])

  const blogFormRef = useRef()

  const handleToggle = () => {
    blogFormRef.current.toggleVisibility()
  }

  if (user === null) return <LoginForm />

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>
        {user.name} logged in
        <button onClick={() => dispatch(logoutUser())}>logout</button>
      </p>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm handleToggle={handleToggle} />
      </Togglable>
      <BlogList username={user.username} />
    </div>
  )
}

export default App