import React, { useEffect } from 'react'
import { useGlobalContext } from '../../context/FormContext'

export default function LoginForm() {
  const { fields, validation, emailRef, handleChange } = useGlobalContext()
  const { email, password } = fields
  const { isEmailPassed, isPasswordPassed } = validation

  useEffect(() => {
    emailRef.current.focus()
  }, [emailRef])

  return (
    <>
      {/* email input */}
      <div className='form-control'>
        <label htmlFor='email'>email</label>
        <input
          type='email'
          name='email'
          id='email'
          ref={emailRef}
          value={email}
          onChange={(e) => handleChange('email', e)}
          onBlur={(e) => handleChange('email', e)}
        />
        {isEmailPassed === false && (
          <p className='form-error'>{`ex: "example@example.com"`}</p>
        )}
      </div>
      {/* end of email input */}
      {/* password input */}
      <div className='form-control'>
        <label htmlFor='password'>password</label>
        <input
          type='password'
          name='password'
          id='password'
          // ref={passwordRef}
          value={password}
          onChange={(e) => handleChange('password', e)}
          onBlur={(e) => handleChange('password', e)}
        />
        {isPasswordPassed === false && (
          <p className='form-error'>{`at least 6 digits or numbers`}</p>
        )}
      </div>
      {/* end of password input */}
    </>
  )
}
