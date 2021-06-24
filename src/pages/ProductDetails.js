import React from 'react'

import { useParams } from 'react-router'

export default function ProductDetails() {
  const { id } = useParams()
  return (
    <h1>
      hello from product details page <p>Product is: {id}</p>
    </h1>
  )
}
