import axios from 'axios'
const baseUrl = '/api/users'

const create = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { create }