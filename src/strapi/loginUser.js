import axios from 'axios'
import URL from '../utils/URL'
import { handleError, handleSuccess } from '../utils/helpers'

async function loginUser({ email, password, toggleAlert }) {
  return axios
    .post(`${URL}/auth/local`, { identifier: email, password })
    .then((res) => {
      handleSuccess(res, toggleAlert)
      return res
    })
    .catch((error) => handleError(error, toggleAlert))
}

export default loginUser
