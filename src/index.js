import React from 'react'
import ReactDOM from 'react-dom'
import ProductsProvider from './context/productsContext'
import { CartProvider } from './context/cartContext'
import { FormProvider } from './context/FormContext'
import { UserProvider } from './context/userContext'
import App from './App'
import './index.css'

ReactDOM.render(
  <UserProvider>
    <ProductsProvider>
      <CartProvider>
        <FormProvider>
          <App />
        </FormProvider>
      </CartProvider>
    </ProductsProvider>
  </UserProvider>,
  document.getElementById('root')
)
