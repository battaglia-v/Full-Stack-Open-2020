import React from 'react'
import { filterChange } from '../reducers/FilterReducer'
import { connect } from 'react-redux'


const Filter = ( props ) => {
  const handleChange = (e) => {
    props.filterChange(e.target.value)
    console.log(e.target.value)
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      Filter Anecdotes: <input onChange={handleChange} />
    </div>
  )
}

export default connect(
	null,
	{ filterChange }
)(Filter)