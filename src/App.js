import React from 'react'

// router
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

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
import Alert from './components/Alert'
import PrivateRoute from './components/PrivateRoute'
import ScrollButton from './components/ScrollButton'

export default function App() {
  return (
    <Router>
      <Header />
      <Alert />
      <ScrollButton />
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
        <PrivateRoute path='/checkout'>
          <Checkout />
        </PrivateRoute>
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
