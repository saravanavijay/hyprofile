import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const auth = (ComposedComponent) => {
  class Authentication extends Component {
    componentDidMount() {
      if (!this.props.authenticated) {
        this.props.history.push('/login');
      }
    }
    componentDidUpdate(prevProps) {
      if (prevProps.authenticated && !this.props.authenticated) {
        this.props.history.push('/login');
      }
    }
    PropTypes = {
      router: PropTypes.object,
    }
    render() {
      if (this.props.authenticated && this.props.user) {
        return <ComposedComponent {...this.props} user={this.props.user} />;
      }
      return <div />;
    }
  }

  function mapStateToProps(state) {
    return {
      authenticated: state.auth.authenticated,
      user: state.auth.user,
    };
  }
  return connect(mapStateToProps)(Authentication);
};

export default auth;
