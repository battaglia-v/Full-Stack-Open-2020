import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newBlog, config)
  console.log(response.data)
  return response.data
}

const update = async (updatedBlog) => {
  const config = {
    headers: { Authorization: token },
  }

  const update = await axios.put(
    `${baseUrl}/${updatedBlog.id}`,
    updatedBlog,
    config
  )
  console.log(update.data)
  return update.data
}

const remove = async id => {
  const config = {
    headers: { Authorization: token },
  }

  const deletedBlog = await axios.delete(
    `${baseUrl}/${id}`,
    config
  )
  return deletedBlog.data
}

export default { getAll, create, update, setToken, remove }

