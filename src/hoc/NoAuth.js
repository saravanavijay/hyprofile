import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const noAuth = (ComposedComponent) => {
  class NoAuthentication extends Component {
    componentDidMount() {
      if (this.props.authenticated) {
        this.props.history.push('/');
      }
    }
    componentDidUpdate(prevProps) {
      if (!prevProps.authenticated && this.props.authenticated) {
        this.props.history.push('/');
      }
    }
    PropTypes = {
      router: PropTypes.object,
    }
    render() {
        return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return {
      authenticated: state.auth.authenticated,
    };
  }
  return connect(mapStateToProps)(NoAuthentication);
};

export default noAuth;
