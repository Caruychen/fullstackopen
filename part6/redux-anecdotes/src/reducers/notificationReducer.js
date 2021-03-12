const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    default:
      return state
  }
}

export const setNotification = (message, timeToDisplay) => {
  return dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: message
    })
    setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        data: null
      })
    }, timeToDisplay);
  }
}

export default notificationReducer