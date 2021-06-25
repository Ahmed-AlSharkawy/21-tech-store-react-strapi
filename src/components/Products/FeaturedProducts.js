import React, { useContext } from 'react'
import { ProductsContext } from '../../context/productsContext'
import ProductList from './ProductList'
import Loading from '../Loading'

export default function FeaturedProducts() {
  const { isLoading, featured } = useContext(ProductsContext)

  if (isLoading) return <Loading />
  return <ProductList title='Featured Products' products={featured} />
}
