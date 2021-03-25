import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { initializeBlogs } from './reducers/blogsReducer'
import { initializeUser, logoutUser } from './reducers/userReducer'
import './App.css'

const App = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
  }, [dispatch])

  const blogFormRef = useRef()

  if (user === null) return <LoginForm />
  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>
        {user.name} logged in <button onClick={() => dispatch(logoutUser())}>logout</button>
      </p>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm handleToggle={() => blogFormRef.current.toggleVisibility()} />
      </Togglable>
      <BlogList username={user.username} />
    </div>
  )
}

export default App