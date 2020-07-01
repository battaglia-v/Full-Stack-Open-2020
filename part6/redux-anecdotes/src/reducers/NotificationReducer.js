
const NotificationReducer = (state = null, action) => {
switch (action.type) {
    case 'NEW_MESSAGE':
      return action.message
    case 'HIDE_MESSAGE':
      return null 
    default: 
      return state
  }
}

export const sendNotification = (message) => {
  console.log(message)
    return {
        type: 'NEW_MESSAGE',
        message
    }
    
  }

export const hideNotification = () => {
     return {
      type: 'HIDE_MESSAGE'
     }
  }

  export const setNotification = (message, timeout) => {
    return async dispatch =>{
        await dispatch(sendNotification(message))
        
        setTimeout(() => {
            dispatch(hideNotification())
        }, timeout * 1000)
    }
}
    

export default NotificationReducer
