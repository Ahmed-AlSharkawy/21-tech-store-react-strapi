// helper functions

export function featuredProducts(products) {
  return products.filter((product) => product.featured === true)
}
