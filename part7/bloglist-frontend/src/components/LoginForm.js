import React, { useState } from 'react'
import Notification from './Notification'
import FormInput from './FormInput'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      dispatch(loginUser({ username, password }))
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      dispatch(setNotification('error', exception.response.data.error))
    }
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <Notification />
      <form onSubmit={handleLogin}>
        <FormInput value={username} text='username' type='text' onChange={setUsername} />
        <FormInput value={password} text='password' type='password' onChange={setPassword} />
        <button id="login-button" type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm