import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { FaAngleUp, FaAngleDown } from 'react-icons/fa'
import { CartContext } from '../../context/cartContext'

export default function CartItem({ id, title, price, image, amount }) {
  const { removeItem, increaseAmount, decreaseAmount } = useContext(CartContext)

  return (
    <article className='cart-item'>
      <Link to={`/products/${id}`}>
        <img src={image} alt={title} />
      </Link>
      <div>
        <h4>{title}</h4>
        <h5>${price}</h5>
        <button
          type='button'
          className='cart-btn remove-btn'
          onClick={() => removeItem(id)}
        >
          remove
        </button>
      </div>
      <div>
        <button
          type='button'
          className='cart-btn amount-btn'
          onClick={() => increaseAmount(id)}
        >
          <FaAngleUp />
        </button>
        <p className='item-amount'>{amount}</p>
        <button
          type='button'
          className='cart-btn amount-btn'
          onClick={() => decreaseAmount(id, amount)}
        >
          <FaAngleDown />
        </button>
      </div>
    </article>
  )
}
