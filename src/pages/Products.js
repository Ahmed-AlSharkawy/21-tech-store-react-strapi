import React from 'react'
import { useProductsContext } from '../context/productsContext'
import Loading from '../components/Loading'
import Filters from '../components/Products/Filters'
import Pages from '../components/Products/Pages'

export default function Products() {
  const { isLoading } = useProductsContext()

  if (isLoading) return <Loading />

  return (
    <>
      <Filters />
      <Pages />
    </>
  )
}
