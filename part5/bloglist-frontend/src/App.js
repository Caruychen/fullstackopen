import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
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

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      const newBlog = { title, author, url }
      const blog = await blogService.create(newBlog)
      setBlogs(blogs.concat(blog))
      notify('success', `a new blog ${blog.title} by ${blog.author} added`)
      setTitle('')
      setAuthor('')
      setUrl('')
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

  const blogFormProps = {
    handleCreate,
    title,
    setTitle,
    author,
    setAuthor,
    url,
    setUrl
  }

  if (user === null) return <LoginForm {...loginFormProps} />

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message}/>
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      <BlogForm {...blogFormProps} />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App