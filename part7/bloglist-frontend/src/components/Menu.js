import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser } from '../reducers/profileReducer'

const Menu = ({ name }) => {
  const dispatch = useDispatch()
  const linkStyle = {
    paddingRight: 5
  }

  return (
    <nav>
      <Link to='/blogs' style={linkStyle}>blogs</Link>
      <Link to='/users' style={linkStyle}>users</Link>
      {name} logged in <button onClick={() => dispatch(logoutUser())}>logout</button>
    </nav>
  )
}

export default Menu