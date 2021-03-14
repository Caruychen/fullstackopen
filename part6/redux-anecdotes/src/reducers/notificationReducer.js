let _notificationTimeout

const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return action.data
    case 'HIDE_NOTIFICATION':
      return null
    default:
      return state
  }
}

export const showNotification = (message) => {
  return {
    type: 'SHOW_NOTIFICATION',
    data: message
  }
}

export const hideNotification = () => {
  return {
    type: 'HIDE_NOTIFICATION'
  }
}

export const setNotification = (message, timeToDisplay) => {
  return dispatch => {
    clearTimeout(_notificationTimeout)
    dispatch(showNotification(message))
    _notificationTimeout = setTimeout(() => {
      dispatch(hideNotification())
    }, timeToDisplay);
  }
}

export default notificationReducer