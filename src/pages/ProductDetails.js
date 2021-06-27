import React, { useContext } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import { ProductsContext } from '../context/productsContext'
import { CartContext } from '../context/cartContext'
import Loading from '../components/Loading'

export default function ProductDetails() {
  const id = parseInt(useParams().id)
  const history = useHistory()
  const { products } = useContext(ProductsContext)
  const { addToCart } = useContext(CartContext)

  const handleWrongItem = () => {
    return (
      <section className='section error-page'>
        <div className='error-container'>
          <h1>OOPS!</h1>
          <h2>Wrong product ID</h2>
          <Link to='/products' className='btn btn-primary'>
            Try other products
          </Link>
        </div>
      </section>
    )
  }

  if (!id) return handleWrongItem()
  if (products.length === 0) return <Loading />

  const product = products.find((item) => item.id === id)
  if (!product) return handleWrongItem()

  const { title, price, description, image } = product

  return (
    <section className='single-product'>
      <img src={image} alt={title} />
      <article>
        <h1>{title}</h1>
        <h2>${price}</h2>
        <p>{description}</p>
        <button
          style={{ maxWidth: '15rem' }}
          className='btn btn-primary btn-block'
          onClick={() => {
            addToCart(product)
            history.push('/cart')
          }}
        >
          add to cart
        </button>
      </article>
    </section>
  )
}
