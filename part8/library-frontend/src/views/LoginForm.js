import { useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { LOGIN } from '../queries'

const LoginForm = ({ setToken, show, setPage, getUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login, result] = useMutation(LOGIN, {
    onCompleted: () => setPage('authors'),
    onError: (error) => {
      alert(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('user-token', token)
      getUser()
    }
  }, [result.data, setToken, getUser])

  const submit = async (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
  }

  if (!show) return null
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div>
          username <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm