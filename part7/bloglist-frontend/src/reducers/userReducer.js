import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data
    case 'REMOVE_USER':
      return null
    default: return state
  }
}

export const setUser = (user) => {
  return {
    type: 'SET_USER',
    data: user
  }
}

export const loginUser = (credentials) => {
  return async dispatch => {
    const loggedUser = await loginService.login(credentials)
    window.localStorage.setItem(
      'loggedBlogappUser', JSON.stringify(loggedUser)
    )
    blogService.setToken(loggedUser.token)
    dispatch({
      type: 'SET_USER',
      data: loggedUser
    })
    dispatch(setNotification('success', `logged in as ${loggedUser.name}`))
  }
}

export const logoutUser = () => {
  window.localStorage.removeItem('loggedBlogappUser')
  return {
    type: 'REMOVE_USER'
  }
}

export default userReducer