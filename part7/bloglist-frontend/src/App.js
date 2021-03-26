import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blogs from './views/Blogs'
import Users from './views/Users'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { initializeBlogs } from './reducers/blogsReducer'
import { initializeProfile, logoutUser } from './reducers/profileReducer'
import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom'
import './App.css'

const App = () => {
  const profile = useSelector(state => state.profile)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeProfile())
  }, [dispatch])

  if (profile === null) return <LoginForm />
  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>
        {profile.name} logged in
      </p>
      <button onClick={() => dispatch(logoutUser())}>logout</button>
      <Router>
        <Switch>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Blogs profile={profile} />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App