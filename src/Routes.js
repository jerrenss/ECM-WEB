import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import SignUp from './views/user/SignUp'
import SignIn from './views/user/SignIn'
import Home from './views/home'

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={SignIn} />
        <Route path="/signup" exact component={SignUp} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
