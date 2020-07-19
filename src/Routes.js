import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import SignUp from './views/user/SignUp'
import SignIn from './views/user/SignIn'
import Home from './views/home'
import PrivateRoute from './PrivateRoute'
import UserDashboard from './views/user/UserDashboard'
import AdminRoute from './AdminRoute'
import AdminDashboard from './views/user/AdminDashboard'
import AddCategory from './views/admin/AddCategory'
import AddProduct from './views/admin/AddProduct'
import Shop from './views/shop'
import Product from './views/product'

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/shop" exact component={Shop} />
        <Route path="/signin" exact component={SignIn} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/product/:productId" exact component={Product} />
        <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute path="/create/category" exact component={AddCategory} />
        <AdminRoute path="/create/product" exact component={AddProduct} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
