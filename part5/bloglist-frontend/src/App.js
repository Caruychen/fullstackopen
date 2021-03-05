import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  const sortBlogs = blogs => blogs.sort((blog1, blog2) => blog2.likes - blog1.likes)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(sortBlogs(blogs))
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const loggedUser = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(loggedUser)
      )
      blogService.setToken(loggedUser.token)
      setUser(loggedUser)
      notify('success', `logged in as ${loggedUser.name}`)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      notify('error', exception.response.data.error)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const blogFormRef = useRef()

  const addBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    try {
      const blog = await blogService.create(newBlog)
      setBlogs(blogs.concat(blog))
      notify('success', `a new blog ${blog.title} by ${blog.author} added`)
    }
    catch (exception) {
      notify('error', exception.response.data.error)
    }
  }

  const updateBlog = blog => async () => {
    try {
      const updatedBlog = await blogService.update(blog)
      const newBlogArray = blogs
        .map(blog => blog.id === updatedBlog.id ? { ...blog, likes: updatedBlog.likes } : blog)
      setBlogs(sortBlogs(newBlogArray))
    }
    catch (exception) {
      notify('error', exception.response.data.error)
    }
  }

  const notify = (status, text) => {
    setMessage({ status, text })
    setTimeout(() => {
      setMessage(null)
    }, 5000);
  }

  const loginFormProps = {
    handleLogin,
    username,
    setUsername,
    password,
    setPassword,
    message
  }

  if (user === null) return <LoginForm {...loginFormProps} />

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleUpdate={updateBlog} username={user.username}/>
      )}
    </div>
  )
}

export default App