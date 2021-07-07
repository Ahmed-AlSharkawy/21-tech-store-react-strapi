import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import img from '../../assets/mainBcg.jpeg'

export default function Product({ id, title, price, image }) {
  return (
    <article className='product'>
      <div className='img-container'>
        <img src={image || img} alt={title || 'Item not found'} />
        <Link to={`products/${id}`} className='btn btn-primary product-link'>
          Details
        </Link>
      </div>
      <div className='product-footer'>
        <p className='product-title'>{title || 'Item not found'}</p>
        <p className='product-price'>${price || '0.00'}</p>
      </div>
    </article>
  )
}

Product.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
}
