import React from 'react'
import ReactDOM from 'react-dom'
import ProductsProvider from './context/productsContext'
import { CartProvider } from './context/cartContext'
import { FormProvider } from './context/FormContext'
import App from './App'
import './index.css'

ReactDOM.render(
  <ProductsProvider>
    <CartProvider>
      <FormProvider>
        <App />
      </FormProvider>
    </CartProvider>
  </ProductsProvider>,
  document.getElementById('root')
)
