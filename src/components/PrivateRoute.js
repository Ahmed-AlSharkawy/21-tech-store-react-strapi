import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useUserContext } from '../context/userContext'

export default function PrivateRoute({ children, ...rest }) {
  const {
    user: { token },
  } = useUserContext()

  return (
    <Route
      {...rest}
      render={() => {
        return token ? children : <Redirect to='/login' />
      }}
    />
  )
}
