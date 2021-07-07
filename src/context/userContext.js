import React, {
  useContext,
  useReducer,
  useCallback,
  useState,
  useEffect,
} from 'react'
import reducer from '../reducer/UserReducer'

import { LOGIN, LOGOUT, TOGGLE_ALERT } from '../utils/actions'

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

  const [height, setHeight] = useState(0)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setHeight(window.scrollY + window.innerHeight)
    })
    return () => {
      window.removeEventListener('scroll', () => {
        // empty function
      })
    }
  })

  const setLogin = (response) => {
    dispatch({ type: LOGIN, payload: response })
  }

  const setLogout = () => {
    dispatch({ type: LOGOUT })
  }

  const toggleAlert = useCallback((alertInfo = null) => {
    dispatch({ type: TOGGLE_ALERT, payload: alertInfo })
  }, [])

  return (
    <UserContext.Provider
      value={{ ...state, height, setLogin, setLogout, toggleAlert }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => {
  return useContext(UserContext)
}

export { UserContext, UserProvider }
