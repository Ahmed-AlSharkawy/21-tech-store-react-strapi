import axios from 'axios'
import URL from '../utils/URL'
import { handleError, handleSuccess } from '../utils/helpers'

async function registerUser({ email, password, username, toggleAlert }) {
  return axios
    .post(`${URL}/auth/local/register`, { username, email, password })
    .then((res) => {
      handleSuccess(res, toggleAlert)
      return res
    })
    .catch((error) => handleError(error, toggleAlert))
}

export default registerUser
