import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blogs from './views/Blogs'
import Users from './views/Users'
import User from './views/User'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { initializeBlogs } from './reducers/blogsReducer'
import { initializeProfile, logoutUser } from './reducers/profileReducer'
import { initializeUsers } from './reducers/usersReducer'
import {
  Switch, Route,
  useRouteMatch
} from 'react-router-dom'
import './App.css'

const App = () => {
  const profile = useSelector(state => state.profile)
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeProfile())
    dispatch(initializeUsers())
  }, [dispatch])

  const match = useRouteMatch('/users/:id')
  const user = match
    ? users.find(user => user.id === match.params.id)
    : null

  if (profile === null) return <LoginForm />
  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>
        {profile.name} logged in
      </p>
      <button onClick={() => dispatch(logoutUser())}>logout</button>
      <Switch>
        <Route path="/users/:id">
          <User user={user} />
        </Route>
        <Route path="/users">
          <Users users={users} />
        </Route>
        <Route path="/">
          <Blogs profile={profile} />
        </Route>
      </Switch>
    </div>
  )
}

export default App