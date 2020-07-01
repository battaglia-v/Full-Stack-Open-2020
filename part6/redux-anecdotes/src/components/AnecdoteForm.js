import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/AnecdoteReducer'
import { setNotification } from '../reducers/NotificationReducer'


const AnecdoteForm = (props) => {

    const onAddAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
            props.createAnecdote(content)
            props.setNotification(`you added '${content}'`, 5)
    }


    return (
        <>
        <h2>create new</h2>
        <form onSubmit={onAddAnecdote}>
          <div><input name="anecdote"></input></div>
          <button type="submit">create</button>
        </form>
        </>
    )
}

export default connect(
  null,
  { setNotification, createAnecdote }
)(AnecdoteForm)