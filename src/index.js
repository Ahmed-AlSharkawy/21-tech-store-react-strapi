import React from 'react'
import ReactDOM from 'react-dom'
import ProductsProvider from './context/productsContext'
import { CartProvider } from './context/cartContext'
import App from './App'
import './index.css'

ReactDOM.render(
  <ProductsProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </ProductsProvider>,
  document.getElementById('root')
)
