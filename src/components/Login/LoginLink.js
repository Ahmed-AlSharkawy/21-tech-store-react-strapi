import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useUserContext } from '../../context/userContext'
import { CartContext } from '../../context/cartContext'

export default function LoginLink() {
  const { user, setLogout, toggleAlert } = useUserContext()
  const { clearCart } = useContext(CartContext)

  const logoutUser = () => {
    const { username } = user
    setLogout()
    clearCart()
    toggleAlert({
      msg: `goodbye ${username}. please come back later`,
      type: 'success',
    })
  }

  if (user.token) {
    return (
      <button className='login-btn' onClick={logoutUser}>
        Logout
      </button>
    )
  }

  return <Link to='/login'>Login</Link>
}
