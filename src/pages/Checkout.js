import React, { useContext, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  CardElement,
  StripeProvider,
  Elements,
  injectStripe,
} from 'react-stripe-elements'
import { CartContext } from '../context/cartContext'
import { useUserContext } from '../context/userContext'
import EmptyCart from '../components/Cart/EmptyCart'
import checkout from '../stripe/checkout'
import submitOrder from '../strapi/submitOrder'

function Checkout(props) {
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
    if (nameRef.current) nameRef.current.focus()
  }, [])

  const handleSubmit = async (e) => {
    toggleAlert({
      msg: 'submitting order \n please wait...',
      type: 'success',
    })
    e.preventDefault()
    // checkout function should return {token} or {err} or {errMsg}
    const { token, err, errMsg } = await checkout(props, toggleAlert)

    if (err) console.log(error)
    else if (errMsg) setError(errMsg)
    else if (token) {
      setError('')
      const { id } = token
      let order = await submitOrder({
        name,
        total,
        items: cart,
        stripeTokenId: id,
        userToken: user.token,
      })
      if (order) {
        toggleAlert({
          msg: 'your order is complete',
          type: 'success',
        })
        clearCart()
        history.push('/')
        return
      } else {
        toggleAlert({
          msg: 'there was an error with your order. \n please try again!',
          type: 'danger',
        })
      }
    }
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
        <CardElement className='card-element' />
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

const CardForm = injectStripe(Checkout)

const StripeWrapper = () => {
  return (
    <StripeProvider apiKey='pk_test_51J9Xy6CaAkMYTVNM2TQpZxewoVmM5mRoZwwD22Un3h180aqDx10mMf13D8byB00pU0Ws9AmqU6zd2NoZiRQuiNEg00e0sq9I7g'>
      <Elements>
        <CardForm />
      </Elements>
    </StripeProvider>
  )
}
export default StripeWrapper
