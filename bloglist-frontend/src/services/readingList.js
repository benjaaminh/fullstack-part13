import axios from 'axios'
const baseUrl = '/api/readinglists'

let token = null
let config = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
  config = {
    headers: { Authorization: token },
  }
}

const create = async newObject => {
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

export default { create, setToken }