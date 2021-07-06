import React, { useEffect } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { useGlobalContext } from '../context/FormContext'
import { useUserContext } from '../context/userContext'
import LoginForm from '../components/Login/LoginForm'
import RegisterForm from '../components/Login/RegisterForm'
import loginUser from '../strapi/loginUser'
import registerUser from '../strapi/registerUser'

/* TODO
  // validation (DONE)
    - validate email, password and username syntax with regex
    - edit error messages for email, password and username

  // refactoring (DONE)
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

  const {
    user: { token },
    setLogin,
    alert: { isShown },
    toggleAlert,
  } = useUserContext()
  const { behavior, fields, resetForm } = useGlobalContext()
  const { isMember, isPassed } = behavior
  const { email, password, username } = fields

  useEffect(() => {
    resetForm('load')
  }, [resetForm])

  if (token) return <Redirect to='/products' />

  const handleSubmit = async (e) => {
    toggleAlert({
      msg: 'we are handling your request.\nplease wait...',
      type: 'success',
    })
    e.preventDefault()
    let response
    if (isMember) response = await loginUser({ email, password, toggleAlert })
    else
      response = await registerUser({ email, password, username, toggleAlert })

    if (response) {
      setLogin(response)
      history.push('/products')
    }
  }

  return (
    <section className='form section'>
      <h2 className='section-title'>{isMember ? 'sign in' : 'register'}</h2>
      {/* form section */}
      <form className='login-form'>
        {/* inputs block */}
        {isMember ? <LoginForm /> : <RegisterForm />}
        {/* end of inputs block */}
        {/* submit and toggle block */}
        {/* submit */}
        {isPassed === true && !isShown && (
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
        {/* end of submit */}
        {/*  toggle  */}
        <p className='register-link'>
          {isMember ? 'need to register' : 'already a member'}
          <button type='button' onClick={() => resetForm('toggle')}>
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
