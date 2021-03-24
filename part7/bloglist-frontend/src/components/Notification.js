import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector(state => state.notification)

  if (message === null) return null

  return (
    <div className={`notification ${message.status}`}>
      {message.text}
    </div>
  )
}

export default Notification