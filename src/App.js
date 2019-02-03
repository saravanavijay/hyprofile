import React, { Component } from 'react';
import { connect } from 'react-redux';
import withRoot from './withRoot';
import Routes from './routers';
import { withStyles } from '@material-ui/core/styles';
import { getUser } from './modules/auth';

const styles = theme => ({
});
class App extends Component {

  componentDidMount() {
    this.props.getUser();
  }

  render() {
    const { classes } = this.props;
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


export default withRoot(connect(null,mapDispatchToProps)(withStyles(styles)(App)));
