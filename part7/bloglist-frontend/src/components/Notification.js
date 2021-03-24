import React from 'react'

const Notification = ({ message }) => {
  if (message === null) return null

  return (
    <div className={`notification ${message.status}`}>
      {message.text}
    </div>
  )
}

export default Notification