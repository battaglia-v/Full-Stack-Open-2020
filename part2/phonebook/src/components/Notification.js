import React from 'react'

const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    if (message.includes('Added') || message.includes('Updated')) {
                
    return (
        <div className="addedMessage">
            {message}
        </div>
    )
    }

    else {
        return (
            <div className="errorMessage">
                {message}
            </div>
        )

    }
}

export default Notification

