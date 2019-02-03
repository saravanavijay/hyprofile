import React, { Component } from 'react';
import withRoot from './withRoot';
import Routes from './routers';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
});
class App extends Component {

  render() {
    const { classes } = this.props;
    return (
      <Routes />
    );
  }
}

export default withRoot(withStyles(styles)(App));
