import React from 'react'
import LoginForm from './LoginForm'
import { useGlobalContext } from '../../context/FormContext'

export default function RegisterForm() {
  const { fields, validation, handleChange } = useGlobalContext()
  const { rePassword, username } = fields
  const { isRePasswordPassed, isUsernamePassed } = validation

  return (
    <>
      <LoginForm />
      {/* rePassword input */}
      <div className='form-control'>
        <label htmlFor='rePassword'>re enter Password</label>
        <input
          type='password'
          name='rePassword'
          id='rePassword'
          // ref={rePasswordRef}
          value={rePassword}
          onChange={(e) => handleChange('repassword', e)}
          onBlur={(e) => handleChange('repassword', e)}
        />
        {isRePasswordPassed === false && (
          <p className='form-error'>should match password field</p>
        )}
      </div>
      {/* end of rePassword input */}
      {/* username input */}
      <div className='form-control'>
        <label htmlFor='username'>user name</label>
        <input
          type='username'
          name='username'
          id='username'
          // ref={usernameRef}
          value={username}
          onChange={(e) => handleChange('username', e)}
          onBlur={(e) => handleChange('username', e)}
        />
        {isUsernamePassed === false && (
          <p className='form-error'>username is required</p>
        )}
      </div>
      {/* end of username input */}
    </>
  )
}
