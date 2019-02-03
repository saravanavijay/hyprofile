import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';

import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Profile from '../screens/Profile';
import Verfiy from '../screens/Verify';

import auth from '../hoc/Authentication';
import noAuth from '../hoc/NoAuth';


class RouterComponent extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route component={Header} />
          <Route path="/login" exact component={noAuth(Login)} />
          <Route path="/signup" exact component={noAuth(Signup)} />
          <Route path="/verify/:code" exact component={Verfiy} />
          <Route path="/" exact component={auth(Profile)} />
          <Route component={Footer} />
        </div>
      </Router>
    );
  }
}
export default RouterComponent;