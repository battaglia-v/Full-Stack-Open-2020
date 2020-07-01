import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/AnecdoteReducer'
import { setNotification } from '../reducers/NotificationReducer'

const AnecdoteList = (props) => {
  const onVote = (id) => {
          const votedAnecdote = props.anecdotes.find(a => a.id === id)
          props.addVote(votedAnecdote)
          props.setNotification(`You voted for '${votedAnecdote.content}'`, 5)
         }

    return (
        <>
        {props.visibleAnecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
                    {anecdote.content}
            </div>
            <div>
                    {anecdote.votes} votes
                    <p><button onClick={() => onVote(anecdote.id)}>vote</button></p>
            </div>
          </div>
        )}
        </>
    )
}


const anecdotesToShow = ({ anecdotes, filter }) => {
  console.log(anecdotes)
  return filter
      ? anecdotes
                    .filter(a => a.content.toLowerCase().indexOf(filter.toLowerCase()) !== -1 )
                    .sort((a, b) => b.votes - a.votes)
      : anecdotes
                    .sort((a, b) => b.votes - a.votes)
                   
  }


  const mapStateToProps = state => {
    return {
              anecdotes: state.anecdotes,
              visibleAnecdotes: anecdotesToShow(state),
              filter: state.filter
        }
  }

  const mapDispatchToProps = {
    setNotification, 
    addVote
  }
  
  export default connect(
      mapStateToProps,
      mapDispatchToProps
  )(AnecdoteList)