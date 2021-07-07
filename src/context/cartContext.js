import React, { useEffect, useReducer } from 'react'
import reducer from '../reducer/CartReducer'
import {
  SET_CART,
  REMOVE_ITEM,
  INCREASE_AMOUNT,
  DECREASE_AMOUNT,
  ADD_TO_CART,
  CLEAR_CART,
} from '../utils/actions'

const CartContext = React.createContext()

function getCart() {
  if (localStorage.getItem('cart'))
    return JSON.parse(localStorage.getItem('cart'))
  return []
}

const initialState = {
  cart: getCart(),
  cartAdds: {
    amount: 0,
    total: 0,
  },
}

function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    dispatch({ type: SET_CART })
  }, [state.cart])

  // remove Item
  const removeItem = (id) => {
    dispatch({ type: REMOVE_ITEM, payload: id })
  }

  // increase Amount
  const increaseAmount = (id) => {
    dispatch({ type: INCREASE_AMOUNT, payload: id })
  }

  // decrease Amount
  const decreaseAmount = (id, amount) => {
    dispatch({ type: DECREASE_AMOUNT, payload: { id, amount } })
  }

  //add To Cart
  const addToCart = (product) => {
    dispatch({ type: ADD_TO_CART, payload: product })
  }

  //clear Cart
  const clearCart = () => {
    dispatch({ type: CLEAR_CART })
  }

  return (
    <CartContext.Provider
      value={{
        ...state,
        ...state.cartAdds,
        removeItem,
        increaseAmount,
        decreaseAmount,
        addToCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export { CartContext, CartProvider }
