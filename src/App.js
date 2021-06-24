import React from 'react'

// router
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

// pages
import Home from './pages/Home'
import About from './pages/About'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import Error from './pages/Error'

// components
import Header from './components/Header'

export default function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/about'>
          <About />
        </Route>
        <Route path='/cart'>
          <Cart />
        </Route>
        <Route path='/checkout'>
          <Checkout />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route exact path='/products'>
          <Products />
        </Route>
        <Route path='/products/:id' children={<ProductDetails />} />
        <Route path='*'>
          <Error />
        </Route>
      </Switch>
    </Router>
  )
}
