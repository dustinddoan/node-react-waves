import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Layout from "./HOC/layout";
import Auth from './HOC/auth.jsx'
import Home from "./Components/Home";
import RegisterLogin from './Components/Register_Login/index.jsx'
import Register from './Components/Register_Login/register'
import Shop from './Components/Shop'

import UserDashboard from './Components/User'
import AddProduct from './Components/User/Admin/add_product'
import ManageCategories from './Components/User/Admin/manage_categories'
import Cart from './Components/Cart'

class Routes extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/user/dashboard" exact component={Auth(UserDashboard, true)} />
          <Route path="/user/cart" exact component={Auth(Cart, true)} />
          <Route path="/admin/add_product" exact component={Auth(AddProduct, true)} />
          <Route path="/admin/manage_categories" exact component={Auth(ManageCategories, true)} />
          <Route path="/register" exact component={Auth(Register, false)} />
          <Route path="/register_login" exact component={Auth(RegisterLogin, false)} />
          <Route path="/shop" exact component={Auth(Shop, null)} />
          <Route path="/" exact component={Auth(Home, null)} />
        </Switch>
      </Layout>
    );
  }
}

export default Routes;
