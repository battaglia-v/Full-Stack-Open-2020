const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)

  switch (action.type) {
    case 'GOOD':
      const modifiedGood = state.good +1
      return {
        ...state,
         good: modifiedGood 
      }
    case 'OK':
      const modifiedOk = state.ok +1
      return {
        ...state,
         ok: modifiedOk
      }
    case 'BAD':
      const modifiedBad = state.bad +1
      return {
        ...state,
         bad: modifiedBad 
      }
    case 'ZERO':
      return initialState
    default: 
      return state
  }
  
}

export default counterReducer