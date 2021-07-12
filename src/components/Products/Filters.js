import React, { useCallback, useEffect, useState } from 'react'
import { useProductsContext } from '../../context/productsContext'

const Filters = () => {
  const {
    sorted,
    search,
    category,
    shipping,
    price,
    categories,
    prices,
    filterProducts,
    resetFilters,
  } = useProductsContext()

  console.log(categories)
  console.log(prices)

  return (
    <section className='filters-section'>
      <h2 className='section-title'>search products</h2>
      <form className='filters-form'>
        {/* first filters group */}
        <div>
          {/* search filter */}
          <div className='form-group'>
            <label htmlFor='search'>search term</label>
            <input
              type='text'
              className='form-control'
              name='search'
              id='search'
              value={search}
              onChange={filterProducts}
            />
          </div>
          {/* end of search filter */}

          {/* category filter */}
          <div className='form-group'>
            <label htmlFor='category'>category</label>
            <select
              className='form-control'
              name='category'
              id='category'
              value={category}
              onChange={filterProducts}
            >
              <option value='all'>all</option>
              {categories.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          {/* end of category filter */}

          {/* free-shipping filter */}
          <div className='form-group'>
            <input
              type='checkbox'
              name='shipping'
              id='shipping'
              checked={shipping}
              onChange={filterProducts}
            />
            <label htmlFor='shipping'>free shipping</label>
          </div>
          {/* end of free-shipping filter */}
        </div>
        {/* end of first filters group */}

        {/* second filters group */}
        <div>
          {/* price-group filters */}
          <div className='price-group'>
            <p>price</p>
            <label>
              <input
                type='radio'
                name='price'
                value={0}
                checked={price === 0}
                onChange={filterProducts}
              />
              all
            </label>

            {prices.map((item, index) => (
              <React.Fragment key={index}>
                <label>
                  <input
                    type='radio'
                    name='price'
                    value={item}
                    checked={price === item}
                    onChange={(e) => filterProducts(e, item / (index + 1))}
                  />
                  {`$${(item / (index + 1)) * index + 1} - $${item}`}
                </label>
              </React.Fragment>
            ))}
          </div>
          {/* end of price-group filters */}
        </div>
        {/* end of second filters group */}
      </form>
      <h6>
        total products : {sorted.flat().length}{' '}
        <span className='reset-link' onClick={resetFilters}>
          reset filters
        </span>
      </h6>

      <hr />
    </section>
  )
}

export default Filters
