import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { withRouter, Link } from 'react-router-dom';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
};

class Header extends Component {
  render() {
    const { classes } = this.props;
    const { pathname } = this.props.location;
    console.log(pathname);
    const ActionButton = () => {
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

export default withRouter(withStyles(styles)(Header));