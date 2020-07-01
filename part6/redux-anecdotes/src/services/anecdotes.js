/* eslint-disable no-template-curly-in-string */
import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const response = await axios.post(baseUrl, {
		content,
		votes: 0,
		important: false
	})
  return response.data
}

const updateData = async (id, newObject) => {
  const response = await await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
  
}



export default { 
  getAll,
  createNew,
  updateData
 }