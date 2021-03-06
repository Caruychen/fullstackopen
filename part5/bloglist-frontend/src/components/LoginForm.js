import React from 'react'
import Notification from './Notification'
import FormInput from './FormInput'

const LoginForm = (props) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <Notification message={props.message}/>
      <form onSubmit={props.handleLogin}>
        <FormInput value={props.username} text='username' type='text' onChange={props.setUsername}/>
        <FormInput value={props.password} text='password' type='password' onChange={props.setPassword}/>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm