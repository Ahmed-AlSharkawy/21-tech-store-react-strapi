import React, { useContext, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { CartContext } from '../context/cartContext'
import { useUserContext } from '../context/userContext'
import EmptyCart from '../components/Cart/EmptyCart'

export default function Checkout(props) {
  // destruction
  const history = useHistory()
  const nameRef = useRef(null)
  const {
    user,
    alert: { isShown },
    toggleAlert,
  } = useUserContext()
  const { cart, total, clearCart } = useContext(CartContext)

  // state values
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  let isEmpty = !name || isShown

  // functions

  useEffect(() => {
    nameRef.current.focus()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  if (cart.length < 1) return <EmptyCart />

  return (
    <section className='section form'>
      <h2 className='section-title'>checkout</h2>
      <form className='checkout-form'>
        <h3>
          order total : <span>${total}</span>
        </h3>
        {/* single input */}
        <div className='form-control'>
          <label htmlFor='name'>name</label>
          <input
            type='text'
            id='name'
            ref={nameRef}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        {/* end of single input */}
        {/* card element */}
        <div className='stripe-input'>
          <label htmlFor='card-element'>Credit or Debit card</label>
          <p className='stripe-info'>
            Test using this credit card : <span>4242 4242 4242 4242</span>
            <br />
            enter any 5 digits for the zip code
            <br />
            enter any 3 digits for the CVC
          </p>
        </div>
        {/* end of card element */}
        {/* STRIPE ELEMENTS */}
        {/* stripe errors */}
        {error && <p className='form-empty'>{error}</p>}
        {/* empty field */}
        {isEmpty ? (
          <p className='form-empty'>please fill out name field</p>
        ) : (
          <button
            type='submit'
            onClick={handleSubmit}
            className='btn btn-primary btn-block'
          >
            submit
          </button>
        )}
      </form>
    </section>
  )
}
