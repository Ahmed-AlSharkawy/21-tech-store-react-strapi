import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../../context/cartContext'

export default function CartLink() {
  const { amount } = useContext(CartContext)

  return (
    <div className='cart-link-container'>
      <Link to='/cart'>Cart</Link>
      <span className='cart-link-total'>{amount}</span>
    </div>
  )
}
