import { useEffect, useRef } from 'react'
// import URL from './URL'

// helper functions

export function flattenProducts(products) {
  return products.map((product) => {
    // cloudinary for deployment
    const image = product.image.url
    // local setup no deployment
    // const image = `${URL}${product.image.url}`
    return { ...product, image }
  })
}

export function featuredProducts(products) {
  return products.filter((product) => product.featured === true)
}

// mount ref
export function useDidMount() {
  let isMountRef = useRef(false)

  useEffect(() => {
    isMountRef.current = true
  }, [])
  return isMountRef.current
}
