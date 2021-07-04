import { useEffect, useRef } from 'react'

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

// handle login and register alert
export const handleError = (error, toggleAlert) => {
  toggleAlert({
    msg:
      `${error.toString()}.\n please check your information` ||
      'there was some error.\n please try again...',
    type: 'danger',
  })
}

export const handleSuccess = (res, toggleAlert) => {
  toggleAlert({
    msg: `welcome back ${res.data.user.username}.\n have a great time`,
    type: 'success',
  })
}

// mount ref
export function useDidMount() {
  let isMountRef = useRef(false)

  useEffect(() => {
    isMountRef.current = true
  }, [])
  return isMountRef.current
}
