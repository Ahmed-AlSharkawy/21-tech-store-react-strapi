import React, { useContext, useEffect, useReducer } from 'react'
import axios from 'axios'
import reducer from '../reducer/ProductReducer'
import URL from '../utils/URL'
import { featuredProducts, flattenProducts } from '../utils/helpers'
import {
  SET_PRODUCTS,
  TOGGLE_LOADING,
  RESET_FILTERS,
  CHANGE_PAGE,
  SET_FILTERS,
  FILTER_PRODUCTS,
  PAGINATE_PRODUCTS,
  SET_UTILS,
} from '../utils/actions'

export const ProductsContext = React.createContext()

const initialState = {
  lists: {
    products: [],
    featured: [],
    sorted: [[]],
  },
  filters: {
    search: '',
    category: 'all',
    shipping: false,
    price: 0,
    avgPrice: 0,
  },
  utils: {
    isLoading: false,
    page: 0,
    categories: [],
    prices: [],
  },
}

export default function ProductsProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    dispatch({ type: TOGGLE_LOADING, payload: true })

    axios.get(`${URL}/products`).then((response) => {
      const flattenedProducts = flattenProducts(response.data)

      dispatch({
        type: SET_PRODUCTS,
        payload: {
          products: flattenedProducts,
          featured: featuredProducts(flattenedProducts),
        },
      })
      dispatch({ type: PAGINATE_PRODUCTS, payload: flattenedProducts })
      dispatch({ type: SET_UTILS, payload: flattenedProducts })

      dispatch({ type: TOGGLE_LOADING })
    })
  }, [])

  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS })
  }, [state.filters])

  const changePage = (index) => {
    dispatch({ type: CHANGE_PAGE, payload: index })
  }

  const filterProducts = (e, avgPrice = 0) => {
    const type = e.target.type
    const name = e.target.name
    let value
    if (type === 'checkbox') value = e.target.checked
    else if (type === 'radio') value = parseInt(e.target.value) || 0
    else value = e.target.value
    dispatch({ type: SET_FILTERS, payload: { name, value, avgPrice } })
  }

  const resetFilters = () => {
    dispatch({ type: RESET_FILTERS })
  }

  return (
    <ProductsContext.Provider
      value={{
        ...state.lists,
        ...state.filters,
        ...state.utils,
        changePage,
        filterProducts,
        resetFilters,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

export const useProductsContext = () => useContext(ProductsContext)
