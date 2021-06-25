import React, { useContext } from 'react'
import { ProductsContext } from '../context/productsContext'
import Loading from '../components/Loading'
import ProductList from '../components/Products/ProductList'

export default function Products() {
  const { isLoading, products } = useContext(ProductsContext)

  if (isLoading) return <Loading />

  return <ProductList title='our products' products={products} />
}
