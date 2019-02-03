import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';

import Login from '../screens/Login';
import Signup from '../screens/Signup';


class RouterComponent extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route component={Header} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/" exact component={Login} />
          <Route component={Footer} />
        </div>
      </Router>
    );
  }
}
export default RouterComponent;