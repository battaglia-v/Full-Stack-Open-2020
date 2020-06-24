import React from 'react'

const Notification = ({ message }) => {

  if (message === null) {
    return null
  }

  if (message.includes('the new blog' || 'is logged in' || 'deleted'))

    return (
      <div className="positive">
        {message}
      </div>
    )
  else {
    return (
      <div className="error">
        {message}
      </div>
    )
  }
}

export default Notification


