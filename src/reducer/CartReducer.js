import {
  NOT_FOUND,
  GET_CART,
  SET_CART,
  REMOVE_ITEM,
  INCREASE_AMOUNT,
  DECREASE_AMOUNT,
  ADD_TO_CART,
  CLEAR_CART,
} from '../utils/actions'

const reducer = (state, action) => {
  switch (action.type) {
    case GET_CART:
      return { ...state, cart: getCart() }
    case SET_CART:
      return { ...state, cartAdds: setCart(state.cart) }
    case REMOVE_ITEM:
      return { ...state, cart: removeItem(state.cart, action.payload) }
    case INCREASE_AMOUNT:
      return { ...state, cart: toggleAmount(state.cart, action.payload) }
    case DECREASE_AMOUNT:
      const { id, amount } = action.payload
      return { ...state, cart: toggleAmount(state.cart, id, amount) }
    case ADD_TO_CART:
      return { ...state, cart: addToCart(state.cart, action.payload) }
    case CLEAR_CART:
      return { ...state, cart: [] }
    default:
      throw new Error(NOT_FOUND)
  }
}

const getCart = () => {
  if (localStorage.getItem('cart'))
    return JSON.parse(localStorage.getItem('cart'))
  return []
}

const setCart = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart))

  let amount = 0,
    total = 0

  if (cart.length > 0) {
    amount = cart.reduce((totalAmount, item) => {
      totalAmount += item.amount
      return totalAmount
    }, 0)

    total = cart.reduce((totalPrice, item) => {
      let price = item.price * item.amount
      totalPrice += price
      return parseFloat(totalPrice.toFixed(2))
    }, 0)
  }

  return { amount, total }
}

const removeItem = (cart, id) => {
  return cart.filter((item) => item.id !== id)
}

const toggleAmount = (cart, id, itemAmount = 0) => {
  if (!itemAmount)
    return cart.map((item) =>
      item.id === id ? { ...item, amount: item.amount + 1 } : item
    )

  if (itemAmount === 1) return removeItem(cart, id)

  return cart.map((item) =>
    item.id === id && item.amount > 1
      ? { ...item, amount: item.amount - 1 }
      : item
  )
}

const addToCart = (cart, product) => {
  const { id } = product

  if (cart.find((item) => item.id === id)) return toggleAmount(cart, id)

  const { title, price, image } = product

  return [...cart, { id, title, price, image, amount: 1 }]
}

export default reducer
