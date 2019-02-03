import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { withRouter, Link } from 'react-router-dom';

import { logout } from '../modules/auth';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
};

class Header extends Component {

  handleLogout = () => {
    this.props.logout();
  }

  render() {
    const { classes } = this.props;
    const { pathname } = this.props.location;
    const ActionButton = () => {
      if (this.props.authenticated) {
        return (
          <Button color="inherit" onClick={this.handleLogout} >Logout</Button>
        )
      }
      if (pathname === '/signup') {
        return (
          <Button color="inherit" component={Link} to="/login" >Login</Button>
        );
      }
      return (
        <Button color="inherit" component={Link} to="/signup" >Sign up</Button>
      )
    };
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Button color="inherit" component={Link} to="/" >Hyphen Profile</Button>
            <div className={classes.grow} />
            <ActionButton />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Header)));