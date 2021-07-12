import {
  NOT_FOUND,
  SET_PRODUCTS,
  TOGGLE_LOADING,
  RESET_FILTERS,
  CHANGE_PAGE,
  SET_FILTERS,
  FILTER_PRODUCTS,
  PAGINATE_PRODUCTS,
  SET_UTILS,
} from '../utils/actions'
import { paginateProducts, getCategories, getPrices } from '../utils/helpers'

const reducer = (state, action) => {
  switch (action.type) {
    // toggle loading state
    case TOGGLE_LOADING:
      return { ...state, utils: toggleLoading(state.utils, action.payload) }

    // set products and featured product
    case SET_PRODUCTS:
      return { ...state, lists: setProducts(state.lists, action.payload) }

    // sort and paginate products onto sorted products
    case PAGINATE_PRODUCTS:
      return {
        ...state,
        utils: { ...state.utils, page: 0 },
        lists: {
          ...state.lists,
          sorted: paginateProducts(action.payload, 4),
        },
      }

    // set categories and prices utiles
    case SET_UTILS:
      return { ...state, utils: setUtils(state.utils, action.payload) }

    // change products current page
    case CHANGE_PAGE:
      return {
        ...state,
        utils: changePage(
          state.utils,
          action.payload,
          state.lists.sorted.length
        ),
      }

    // change filters values
    case SET_FILTERS:
      return { ...state, filters: setFilters(state.filters, action.payload) }

    // filter sorted products
    case FILTER_PRODUCTS:
      return {
        ...state,
        utils: { ...state.utils, page: 0 },
        lists: {
          ...state.lists,
          sorted: filterProducts(state.lists.products, state.filters),
        },
      }

    // reset filters
    case RESET_FILTERS:
      return {
        ...state,
        utils: { ...state.utils, page: 0 },
        filters: resetFilters(),
      }
    default:
      throw new Error(NOT_FOUND)
  }
}

const toggleLoading = (utils, loadingState) => {
  if (loadingState) return { ...utils, isLoading: true }
  else return { ...utils, isLoading: false }
}

const setProducts = (lists, values) => {
  const { products, featured } = values
  return { ...lists, products, featured }
}

const setUtils = (utils, products) => {
  return {
    ...utils,
    categories: getCategories(products),
    prices: getPrices(products),
  }
}

const changePage = (utils, page, length) => {
  if (page !== utils.page && page < length && page >= 0)
    return { ...utils, page }
  else return utils
}

const setFilters = (filters, values) => {
  const { name, value, avgPrice } = values
  let newFilters
  if (avgPrice) newFilters = { ...filters, [name]: value, avgPrice }
  else newFilters = { ...filters, [name]: value }
  console.log(newFilters)
  return newFilters
}

const filterProducts = (products, filters) => {
  const { search, category, shipping, price, avgPrice } = filters

  let filteredProducts = products

  if (search !== '')
    filteredProducts = filteredProducts.filter((product) =>
      product.title.toLowerCase().trim().startsWith(search)
    )

  if (category !== 'all')
    filteredProducts = filteredProducts.filter(
      (product) => product.category === category
    )

  if (shipping)
    filteredProducts = filteredProducts.filter(
      (product) => product.free_shipping === true
    )

  if (price)
    filteredProducts = filteredProducts.filter(
      (product) => product.price > price - avgPrice && product.price <= price
    )

  return paginateProducts(filteredProducts, 4)
}

const resetFilters = () => {
  return {
    search: '',
    category: 'all',
    shipping: false,
    price: 0,
    avgPrice: 0,
  }
}

/*  commented code
const setProducts = ({ products, featured, sorted }) => {
  return { products, featured, sorted }
}
 */
export default reducer
