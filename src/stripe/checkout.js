const checkout = async (props, toggleAlert) => {
  return props.stripe
    .createToken()
    .then((res) => handleResponse(res, toggleAlert))
    .catch((err) => {
      toggleAlert()
      return { err }
    })
}

const handleResponse = (response, toggleAlert) => {
  const { error, token } = response

  if (token) {
    toggleAlert({
      msg: 'your request have been recieved',
      type: 'success',
    })
    return { token }
  } else if (error) {
    toggleAlert({
      msg: `${error.code} \n ${error.message}`,
      type: 'danger',
    })
    return { errMsg: error.message }
  }
}

export default checkout
