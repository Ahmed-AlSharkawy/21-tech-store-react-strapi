import axios from 'axios'
import URL from '../utils/URL'

const submitOrder = async ({
  name,
  total,
  items,
  stripeTokenId,
  userToken,
}) => {
  return axios
    .post(
      `${URL}/orders`,
      { name, total, items, stripeTokenId },
      { headers: { Authorization: `Bearer ${userToken}` } }
    )
    .catch((error) => console.log(error))
}

export default submitOrder
