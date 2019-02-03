import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import getter from '../utils/getter';
import { verifyUser, logout } from '../modules/auth';

import Layout from '../components/Layout';

class VerifyEmail extends Component {

  componentDidMount(){
    const verifyCode = getter(['match', 'params', 'code'], this.props);
    if (verifyCode && verifyCode.length > 0) {
      this.props.verifyUser({verifyCode}).then(() => {
        this.props.history.push('/');
      });
    } else {
      this.props.logout();
    }
  }
  render() {
    // const { classes } = this.props;
    return (
      <Layout>
        <Typography component="h5" variant="h5" align="center">
          Verifying Email
        </Typography>
      </Layout>
    )
  };
}

const mapStateToProps = (state) => {
  return {
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    verifyUser: (props) => dispatch(verifyUser(props)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VerifyEmail));