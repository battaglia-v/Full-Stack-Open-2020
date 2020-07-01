import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import AnecdoteReducer from "./reducers/AnecdoteReducer"
import NotificationReducer from "./reducers/NotificationReducer"
import FilterReducer from "./reducers/FilterReducer"




const reducer = combineReducers({
    anecdotes: AnecdoteReducer,
    notification: NotificationReducer,
    filter: FilterReducer
  })
 

  const store = createStore(
    reducer, 
    composeWithDevTools(
      applyMiddleware(thunk)
      )
    )

  export default store