/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import { Provider } from 'react-redux';
import { configureStore } from './store';

// core components
import Auth from "layouts/Auth";
import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";

import "assets/css/material-dashboard-react.css?v=1.9.0";

const hist = createBrowserHistory();
const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/admin" component={Admin} />
        <Route path="/rtl" component={RTL} />
        {/*
        <Redirect from="/" to="/admin/dashboard" />
        */}
        <Redirect from="/" to="/auth/sign-in" />
      </Switch>
    </Router>,
  </Provider>,
  document.getElementById("root")
);