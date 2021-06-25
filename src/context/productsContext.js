import React, { useState, useEffect } from 'react'
import axios from 'axios'
import URL from '../utils/URL'
import { featuredProducts } from '../utils/helpers'

export const ProductsContext = React.createContext()

export default function ProductsProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false)
  const [products, setProducts] = useState([])
  const [featured, setFeatured] = useState([])

  useEffect(() => {
    setIsLoading(true)
    axios.get(`${URL}/products`).then((response) => {
      setProducts(response.data)
      setFeatured(featuredProducts(response.data))
      setIsLoading(false)
    })
  }, [])

  return (
    <ProductsContext.Provider value={{ isLoading, products, featured }}>
      {children}
    </ProductsContext.Provider>
  )
}
