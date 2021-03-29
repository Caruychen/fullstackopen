import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRouteMatch } from 'react-router'
import { addComment } from '../reducers/blogsReducer'

const Comments = ({ comments }) => {
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()

  const blogID = useRouteMatch('/blogs/:id').params.id

  const handleComment = event => {
    event.preventDefault()
    dispatch(addComment(comment, blogID))
    setComment('')
  }

  return (
    <div>
      <h3>Comments</h3>
      <form onSubmit={handleComment}>
        <input
          id='comment-input'
          type='text'
          value={comment}
          name='comment'
          onChange={({ target }) => setComment(target.value)}
        ></input>
        <button id="add-comment-button" type='submit'>add comment</button>
      </form>
      <ul>
        {comments.map(comment => <li key={comment.id}>{comment.text}</li>)}
      </ul>
    </div>
  )
}

export default Comments