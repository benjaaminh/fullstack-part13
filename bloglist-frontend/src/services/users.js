import axios from 'axios'
const baseUrl = '/api/users'

const create = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const update = async (username, newObject) => {
  const response = await axios.put(`${ baseUrl }/${username}`, newObject)
  return response.data
}

const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

export default { create, update, getById }