import React, { useEffect, useState } from 'react'

const CartContext = React.createContext()

function getCart() {
  if (localStorage.getItem('cart'))
    return JSON.parse(localStorage.getItem('cart'))
  return []
}

function CartProvider({ children }) {
  const [cart, setCart] = useState(getCart())
  const [amount, setAmount] = useState(0)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))

    if (cart.length > 0) {
      setAmount(
        cart.reduce((totalAmount, item) => {
          totalAmount += item.amount
          return totalAmount
        }, 0)
      )
      setTotal(
        cart.reduce((totalPrice, item) => {
          let price = item.price * item.amount
          totalPrice += price
          return parseFloat(totalPrice.toFixed(2))
        }, 0)
      )
    } else {
      setAmount(0)
      setTotal(0)
    }
  }, [cart])

  // remove Item
  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id))

    // setCart([...cart].filter((item) => item.id !== id))

    // const newItems = cart.filter((item) => item.id !== id)
    // setCart(newItems)
  }

  // increase Amount
  const increaseAmount = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, amount: item.amount + 1 } : item
      )
    )
    /* setCart(
      cart.map((item) => {
        if (item.id === id) item.amount++
        return item
      })
    ) */
    /* const newItems = cart.map((item) => {
      if (item.id === id) {
        item.amount++
      }
      return item
    })
    setCart(newItems) */
  }

  // decrease Amount
  const decreaseAmount = (id, theAmount) => {
    if (theAmount === 1) return removeItem(id)

    setCart(
      cart.map((item) =>
        item.id === id && item.amount > 1
          ? { ...item, amount: item.amount - 1 }
          : item
      )
    )

    /* setCart(
      cart.map((item) => {
        if (item.id === id && item.amount > 1) item.amount--
        return item
      })
    ) */
    /* const newItems = cart.map((item) => {
      if (item.id === id) {
        item.amount--
      }
      return item
    })
    setCart(newItems) */
  }

  //add To Cart
  const addToCart = (product) => {
    const { id } = product

    if (cart.find((item) => item.id === id)) return increaseAmount(id)

    const { title, price, image } = product

    setCart([...cart, { id, title, price, image, amount: 1 }])
  }

  //clear Cart
  const clearCart = () => {
    setCart([])
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        amount,
        total,
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
