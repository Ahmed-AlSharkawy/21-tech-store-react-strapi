const reducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_USER':
      return { ...state, user: loadUser() }
    case 'LOGIN':
      return { ...state, user: setUser(action.payload) }
    case 'LOGOUT':
      return { ...state, user: clearUser() }
    case 'TOGGLE_ALERT':
      return { ...state, alert: toggleAlert(action.payload) }

    default:
      throw new Error('Action type did not found')
  }
}

const loadUser = () => {
  return localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : { username: null, token: null }
}

const setUser = (userInfo) => {
  const {
    jwt: token,
    user: { username },
  } = userInfo.data

  const user = { username, token }
  localStorage.setItem('user', JSON.stringify(user))
  return user
}

const clearUser = () => {
  localStorage.removeItem('user')
  return { username: null, token: null }
}

const toggleAlert = (alertInfo) => {
  if (alertInfo) {
    const { msg, type } = alertInfo
    return { isShown: true, msg, type }
  } else {
    return { isShown: false, msg: '', type: 'success' }
  }
}

export default reducer
