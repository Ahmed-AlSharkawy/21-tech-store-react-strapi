import React from 'react'
import { Link } from 'react-router-dom'
import { useUserContext } from '../context/userContext'
import CartLink from './Cart/CartLink'
import LoginLink from './Login/LoginLink'
import logo from '../assets/logo.svg'

export default function Header() {
  const {
    user: { token },
  } = useUserContext()

  return (
    <header className='header'>
      <img src={logo} alt='vintage tech logo' className='logo' />
      <nav>
        <ul>
          <div>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/about'>About</Link>
            </li>
            <li>
              <Link to='/products'>Products</Link>
            </li>
            {token && (
              <li>
                <Link to='/checkout'>Checkout</Link>
              </li>
            )}
          </div>
          <div>
            <LoginLink />
            <CartLink />
          </div>
        </ul>
      </nav>
    </header>
  )
}
