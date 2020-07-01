import React from 'react'
import { useDispatch} from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'


const AnecdoteForm = () => {
    const dispatch = useDispatch()


    const onAddAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        dispatch(addAnecdote(content))
        event.target.anecdote.value = ''
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

export default AnecdoteForm