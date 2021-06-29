import React, { useContext, useReducer, useEffect, useRef } from 'react'
import reducer from '../reducer/FormReducer'

const FormContext = React.createContext()

const initialState = {
  behavior: { isMember: true, isPassed: null },
  fields: {
    email: '',
    password: '',
    rePassword: '',
    username: '',
  },
  validation: {
    isEmailPassed: null,
    isPasswordPassed: null,
    isRePasswordPassed: null,
    isUsernamePassed: null,
  },
}

const FormProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const emailRef = useRef(null)

  useEffect(() => {
    emailRef.current.focus()
  }, [state.behavior.isMember])

  const toggleForm = () => {
    dispatch({ type: 'TOGGLE_FORM' })
    emailRef.current.focus()
  }
  const handleChange = (field, e) => {
    const value = e.target.value

    switch (field) {
      case 'email':
        dispatch({ type: 'EMAIL_CHANGE', payload: value })
        break
      case 'password':
        dispatch({ type: 'PASSWORD_CHANGE', payload: value })
        break
      case 'repassword':
        dispatch({ type: 'REPASSWORD_CHANGE', payload: value })
        break
      case 'username':
        dispatch({ type: 'USERNAME_CHANGE', payload: value })
        break
      default:
        break
    }
  }

  return (
    <FormContext.Provider
      value={{ ...state, emailRef, toggleForm, handleChange }}
    >
      {children}
    </FormContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(FormContext)
}

export { FormContext, FormProvider }
