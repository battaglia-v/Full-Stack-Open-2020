import anecdoteService from "../services/anecdotes"

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
    type: "NEW_ANECDOTE",
    data: newAnecdote
    })
  }
}

export const addVote = anecdote => {
  return async dispatch => {
    anecdote.votes++
    await anecdoteService.updateData(anecdote.id, anecdote)
    dispatch({
      type: "VOTE",
      data: anecdote
    })
  }
}

export const initializeAnecdotes = anecdotes => {
        return async dispatch => {
                const anecdotes = await anecdoteService.getAll()
                dispatch({
                           type: 'INIT_ANECDOTES',
                           data: anecdotes
                })
        }
}


const AnecdoteReducer = (state = [], action) => {

  switch(action.type) {
      case 'NEW_ANECDOTE':
        return [...state, action.data]
        case "VOTE":
          return state.map(anecdote =>
            anecdote.id !== action.data.id ? anecdote : action.data
          )
          case 'INIT_ANECDOTES':
            return action.data
      default:
        return state;
    }
  }
  
export default AnecdoteReducer
