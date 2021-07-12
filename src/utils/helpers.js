import { useEffect, useRef } from 'react'

// helper functions

/* products functions */
export function flattenProducts(products) {
  return products.map((product) => {
    // cloudinary for deployment
    const image = product.image ? product.image.url : null
    // local setup no deployment
    // const image = `${URL}${product.image.url}`
    return { ...product, image }
  })
}

export function featuredProducts(products) {
  return products.filter((product) => product.featured === true)
}

export const paginateProducts = (products, itemsPerPage) => {
  const pagesCount = Math.ceil(products.length / itemsPerPage)
  const sortedProducts = products.sort((a, b) => a.price - b.price)

  /* pagination with mutating the source
  const newProducts = Array.from({ length: pagesCount }, () => {
    return products.splice(0, itemsPerPage)
  })
  */

  // pagination without mutating the source
  return Array.from({ length: pagesCount }, (_, index) => {
    const start = index * itemsPerPage
    return sortedProducts.slice(start, start + itemsPerPage)
  })
}
/* end of products functions */

/* utils functions */

export const getCategories = (products) => {
  return Array.from([
    ...new Set(products.flat().map((item) => item.category)),
  ]).sort()
}

export const getPrices = (products) => {
  // readable code
  let avgPrice = 0
  avgPrice = Math.max(
    ...products.flat().map((item) => (item.price ? parseInt(item.price) : 0))
  )
  avgPrice++
  avgPrice /= 3

  avgPrice = Math.ceil(avgPrice / 100) * 100

  return [avgPrice, avgPrice * 2, avgPrice * 3]

  /* one line code
     return (
      Math.ceil(
        (Math.max(
          ...sorted
            .flat()
            .map((item) => (item.price ? parseInt(item.price) : 0))
        ) +
          1) /
          3 /
          100
      ) * 100
    ) */
}

/* end of utils functions */

/* handle login and register alert */
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
/* end of handle login and register alert */

// mount ref
export function useDidMount() {
  let isMountRef = useRef(false)

  useEffect(() => {
    isMountRef.current = true
  }, [])
  return isMountRef.current
}
