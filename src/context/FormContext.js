import React, { useCallback, useContext, useReducer, useRef } from 'react'
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

  const resetForm = useCallback((resetType) => {
    if (resetType === 'load') dispatch({ type: 'LOAD_FORM' })
    else if (resetType === 'toggle') dispatch({ type: 'TOGGLE_FORM' })
  }, [])

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
      value={{ ...state, emailRef, resetForm, handleChange }}
    >
      {children}
    </FormContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(FormContext)
}

export { FormContext, FormProvider }
