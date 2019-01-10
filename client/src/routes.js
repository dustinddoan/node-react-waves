import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Layout from "./HOC/layout";
import Home from "./Components/Home";
import RegisterLogin from './Components/Register_Login/index.jsx'

class Routes extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/register_login" exac component={RegisterLogin} />
          <Route path="/" exac component={Home} />
        </Switch>
      </Layout>
    );
  }
}

export default Routes;
