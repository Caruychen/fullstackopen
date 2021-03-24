import React, { useState } from 'react'
import FormInput from './FormInput'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogsReducer'

const BlogForm = ({ handleToggle }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const handleCreate = event => {
    event.preventDefault()
    handleToggle()
    dispatch(createBlog({ title, author, url }))
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <FormInput value={title} text='title' type='text' onChange={setTitle} />
        <FormInput value={author} text='author' type='text' onChange={setAuthor} />
        <FormInput value={url} text='url' type='text' onChange={setUrl} />
        <button id="create-blog-button" type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm