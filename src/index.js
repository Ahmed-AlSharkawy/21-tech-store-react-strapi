import React from 'react'
import ReactDOM from 'react-dom'
import ProductsProvider from './context/productsContext'
import App from './App'
import './index.css'

ReactDOM.render(
  <ProductsProvider>
    <App />
  </ProductsProvider>,
  document.getElementById('root')
)
