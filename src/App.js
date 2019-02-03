import React, { Component } from 'react';
import { connect } from 'react-redux';
import withRoot from './withRoot';
import Routes from './routers';
import { getUser } from './modules/auth';

class App extends Component {

  componentDidMount() {
    this.props.getUser();
  }

  render() {
    return (
      <Routes />
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: () => dispatch(getUser()),
  }
}


export default withRoot(connect(null,mapDispatchToProps)(App));
