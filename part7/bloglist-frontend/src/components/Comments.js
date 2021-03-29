import React from 'react'

const Comments = ({ comments }) => {
  return (
    <div>
      <h3>Comments</h3>
      <ul>
        {comments.map(comment => <li key={comment.id}>{comment.text}</li>)}
      </ul>
    </div>
  )
}

export default Comments