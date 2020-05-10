import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) =>
  <button onClick={handleClick}>{text}</button>



const App = (props) => {

  // Create array of 0's equal to the length of the anecdotes array //
  const votesArray = Array(anecdotes.length).fill(0)


  // State // 
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(votesArray)
  

// Generate random number between 0 - 6, set as the index of the next quote to display //

  const randomAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
     console.log("current quote", selected)
  }



 // When button is clicked, add vote to array copy, and then set state to copy //
  
  const addVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
    console.log("number of votes:", copy)
 
  }

  // Calculate anecdote with the most votes //
  const topVotes = (Math.max(...votes))
  const topAnecdote = anecdotes[votes.indexOf(topVotes)]





  return (
    <div>
    <h1>Anecdote of the day</h1>
        <div>{props.anecdotes[selected]}</div>
        <div>has {votes[selected]} votes</div>
      <Button
        text='vote'
        handleClick={addVote}
      />
    <Button 
      text='next anecdote'
      handleClick={randomAnecdote}
    />
      <h1>Anecdote with the most votes</h1>
      <div>{topAnecdote}</div>
      <div>has {topVotes} votes</div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'A primary cause of complexity is that software vendors uncritically adopt almost any feature that users want.',
  'Prolific programmers contribute to certain disaster.',
  'Documentation is the castor oil of programming. Managers think it is good for programmers and programmers hate it!'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)