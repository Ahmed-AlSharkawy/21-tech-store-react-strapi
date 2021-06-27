import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../context/cartContext'
// import { UserContext } from '../context/userContext'
import EmptyCart from '../components/Cart/EmptyCart'
import CartItem from '../components/Cart/CartItem'

export default function Cart() {
  const { cart, total } = useContext(CartContext)

  const user = false

  if (cart.length < 1) return <EmptyCart />

  return (
    <section className='section cart-items'>
      <h2>your cart</h2>
      {cart.map((item) => {
        return <CartItem key={item.id} {...item} />
      })}
      <h2>total : ${total}</h2>
      {user ? (
        <Link
          to='/checkout'
          className='btn btn-primary btn-block'
          style={{ maxWidth: '15rem' }}
        >
          checkout
        </Link>
      ) : (
        <Link
          to='/login'
          className='btn btn-primary btn-block'
          style={{ maxWidth: '15rem' }}
        >
          login
        </Link>
      )}
    </section>
  )
}
