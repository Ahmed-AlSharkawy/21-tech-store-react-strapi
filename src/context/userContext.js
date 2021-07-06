import React, { useContext, useReducer, useCallback } from 'react'
import reducer from '../reducer/UserReducer'

const UserContext = React.createContext()

const initialState = {
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : { username: null, token: null },
  alert: {
    isShown: false,
    msg: '',
    type: 'success',
  },
}

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  /*   useEffect(() => {
    dispatch({ type: 'LOAD_USER' })
  }, []) */

  const setLogin = (response) => {
    dispatch({ type: 'LOGIN', payload: response })
  }

  const setLogout = () => {
    dispatch({ type: 'LOGOUT' })
  }

  const toggleAlert = useCallback((alertInfo = null) => {
    dispatch({ type: 'TOGGLE_ALERT', payload: alertInfo })
  }, [])

  return (
    <UserContext.Provider
      value={{ ...state, setLogin, setLogout, toggleAlert }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => {
  return useContext(UserContext)
}

export { UserContext, UserProvider }
