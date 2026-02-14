import axios from 'axios'

const baseUrl = '/api/logout'

let config = null

const setToken = newToken => {
  if (newToken) {
    config = {
      headers: { Authorization: `Bearer ${newToken}` },
    }
  } else {
    config = null
  }
}

const logout = async () => {
  await axios.delete(baseUrl, config)
}

export default { setToken, logout }
