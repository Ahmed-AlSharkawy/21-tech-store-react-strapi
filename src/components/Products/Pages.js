import React, { useEffect } from 'react'
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa'
import { useProductsContext } from '../../context/productsContext'
import { useUserContext } from '../../context/userContext'
import ProductList from './ProductList'

const Pages = () => {
  const { toggleAlert } = useUserContext()
  const { sorted, page, changePage, resetFilters } = useProductsContext()

  const isDataAvalible = sorted[page] && sorted[page].length > 0 ? true : false

  useEffect(() => {
    if (!isDataAvalible) {
      const timer = setTimeout(() => {
        toggleAlert({
          msg: 'no items match your search',
          type: 'danger',
        })
      }, 5)
      return () => {
        clearTimeout(timer)
      }
    }
  }, [isDataAvalible, toggleAlert])

  if (!isDataAvalible) {
    return (
      <div className='error-container'>
        <h3 className='search-errors'>no items match your search</h3>
        <button className='btn btn-primary' onClick={resetFilters}>
          reset filters
        </button>
      </div>
    )
  }
  return (
    <>
      <ProductList products={sorted[page]} />
      {sorted.length > 1 && (
        <article className='pagination-buttons'>
          <button
            disabled={page <= 0 ? true : false}
            className={page <= 0 ? 'page-btn-disabled' : 'prev-page-btn'}
            onClick={() => changePage(page - 1)}
          >
            <FaAngleDoubleLeft />
          </button>
          {sorted.map((_, index) => {
            return (
              <button
                key={index}
                className={`page-btn ${page === index && 'page-btn-current'}`}
                onClick={() => changePage(index)}
              >
                {index + 1}
              </button>
            )
          })}
          <button
            disabled={page >= sorted.length - 1 ? true : false}
            className={
              page >= sorted.length - 1 ? 'page-btn-disabled' : 'next-page-btn'
            }
            onClick={() => changePage(page + 1)}
          >
            <FaAngleDoubleRight />
          </button>
        </article>
      )}
    </>
  )
}

export default Pages
