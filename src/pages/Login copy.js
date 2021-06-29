import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'

/* TODO
  // validation
    - validate email syntax with regex
    - validate password syntax with regex
    - validate username syntax with regex
  // refactoring
    - separate component into four components
    - Login(page)
        + renders, toggels and submits the form
    - LoginForm(component)
        + renders the login form 
    - RegisterForm(component) 
        + renders the registration form
    - FormContext(context)
        + holds both forms state
    - FormReducer(reducer)
        + holds both forms functionality
*/

/* Form Functionality

  // Changes functionality
    - Validate email syntax
    - Validate password length
    - Validate re password match
    - Validate username length

    if not valid
    - set isFieldPassed to false
    - set isPassed to false
    if valid
    - set isFieldPassed to true
    - check other fields
      if all fields valid
      - set isPassed to true

  // Toggling functionality
    - toggle isMember state
    - reset fields to ''
    - reset isPassed to null
    - reset field states to null
    - set focus to email field

*/

export default function Login() {
  const history = useHistory()

  /*  State values */
  // input states
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [username, setUsername] = useState('')
  // form validation states
  const [isMember, setIsMember] = useState(true)
  const [isPassed, setIsPassed] = useState(null)
  // input validation states
  const [isEmailPassed, setIsEmailPassed] = useState(null)
  const [isPasswordPassed, setIsPasswordPassed] = useState(null)
  const [isRePasswordPassed, setIsRePasswordPassed] = useState(null)
  const [isUsernamePassed, setIsUsernamePassed] = useState(null)
  /* end of state values */

  /* input refs */
  const emailRef = useRef(null)

  useEffect(() => {
    emailRef.current.focus()
  }, [])

  /*  functions */
  // form functionality
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const toggleIsMember = () => {
    resetForm()
    resetValidation()
    setIsMember(!isMember)
    emailRef.current.focus()
  }

  const resetForm = () => {
    setEmail('')
    setPassword('')
    setRePassword('')
    setUsername('')
  }

  const resetValidation = () => {
    setIsPassed(null)
    setIsEmailPassed(null)
    setIsPasswordPassed(null)
    setIsRePasswordPassed(null)
    setIsUsernamePassed(null)
  }

  // validation handling
  const handleEmailChange = (e) => {
    const value = e.target.value
    setEmail(value)
    if (value) {
      setIsEmailPassed(true)
      if (
        (isMember && isPasswordPassed) ||
        (!isMember &&
          isPasswordPassed &&
          isRePasswordPassed &&
          isUsernamePassed)
      )
        setIsPassed(true)
    } else {
      setIsEmailPassed(false)
      setIsPassed(false)
    }
  }

  const handlePasswordChange = (e) => {
    const value = e.target.value
    setPassword(value)
    if (value.length > 6) {
      setIsPasswordPassed(true)
      if (
        (isMember && isEmailPassed) ||
        (!isMember && isEmailPassed && isRePasswordPassed && isUsernamePassed)
      )
        setIsPassed(true)
    } else {
      setIsPasswordPassed(false)
      setIsPassed(false)
    }
  }

  const handleRePasswordChange = (e) => {
    const value = e.target.value
    setRePassword(value)
    if (value === password) {
      setIsRePasswordPassed(true)
      if (isEmailPassed && isPasswordPassed && isUsernamePassed)
        setIsPassed(true)
    } else {
      setIsRePasswordPassed(false)
      setIsPassed(false)
    }
  }

  const handleUsernameChange = (e) => {
    const value = e.target.value
    setUsername(value)
    if (value) {
      setIsUsernamePassed(true)
      if (isEmailPassed && isPasswordPassed && isRePasswordPassed)
        setIsPassed(true)
    } else {
      setIsUsernamePassed(false)
      setIsPassed(false)
    }
  }
  /* end of functions */

  return (
    <section className='form section'>
      <h2 className='section-title'>{isMember ? 'sign in' : 'register'}</h2>
      {/* form section */}
      <form className='login-form'>
        {/* inputs block */}
        {/* email input */}
        <div className='form-control'>
          <label htmlFor='email'>email</label>
          <input
            type='email'
            name='email'
            id='email'
            ref={emailRef}
            value={email}
            onChange={(e) => handleEmailChange(e)}
            onBlur={(e) => handleEmailChange(e)}
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
            onChange={(e) => handlePasswordChange(e)}
            onBlur={(e) => handlePasswordChange(e)}
          />
          {isPasswordPassed === false && (
            <p className='form-error'>{`at least 6 digits or numbers`}</p>
          )}
        </div>
        {/* end of password input */}
        {!isMember && (
          <>
            {/* rePassword input */}
            <div className='form-control'>
              <label htmlFor='rePassword'>re enter Password</label>
              <input
                type='password'
                name='rePassword'
                id='rePassword'
                // ref={rePasswordRef}
                value={rePassword}
                onChange={(e) => handleRePasswordChange(e)}
                onBlur={(e) => handleRePasswordChange(e)}
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
                onChange={(e) => handleUsernameChange(e)}
                onBlur={(e) => handleUsernameChange(e)}
              />
              {isUsernamePassed === false && (
                <p className='form-error'>should be at least 6 digits</p>
              )}
            </div>
            {/* end of username input */}
          </>
        )}
        {/* end of inputs block */}
        {/* submit and toggle block */}
        {isPassed === true && (
          <button
            type='submit'
            className='btn btn-primary btn-block'
            onClick={handleSubmit}
          >
            {(isMember && 'log in') || 'register'}
          </button>
        )}
        {isPassed === false && (
          <p className='form-empty'>please handel fields errors</p>
        )}
        {/* end of button */}
        {/*  toggle  */}
        <p className='register-link'>
          {isMember ? 'need to register' : 'already a member'}
          <button type='button' onClick={toggleIsMember}>
            click here
          </button>
        </p>
        {/* end of toggle  */}
        {/* end of submit and toggle block */}
      </form>
      {/* end of form section */}
    </section>
  )
}
