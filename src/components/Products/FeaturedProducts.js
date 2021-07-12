import React from 'react'
import { useProductsContext } from '../../context/productsContext'
import ProductList from './ProductList'
import Loading from '../Loading'

export default function FeaturedProducts() {
  const { isLoading, featured } = useProductsContext()

  if (isLoading) return <Loading />
  return <ProductList title='Featured Products' products={featured} />
}
