import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import Layout from '../components/Layout';
import FacebookButton from '../components/FacebookButton';
import { validateEmail } from '../utils/validator';

import { login, socialLogin } from '../modules/auth';

const styles = theme => ({
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    color: 'white',
  },
  errorDiv: {
    color: '#ee443c',
  }
});

class Login extends Component {

  state = {
    email: '',
    password: '',
    emailError: null,
  };

  handleEmailChange = event => {
    this.setState({ email: event.target.value, emailError: null });
  };

  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    const isEmailValid = validateEmail(email);
    if (!isEmailValid) {
      this.setState({ emailError: 'Email entered is Invalid.' });
      return;
    }
    this.props.login({ email, password });
  }

  responseFacebook = (response) => {
    this.props.socialLogin(response);
  }

  render() {
    const { classes, loginFailed } = this.props;
    return (
      <Layout>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} onSubmit={this.handleSubmit}>
          {
            loginFailed &&
            (
              <Typography variant="body1" className={classes.errorDiv} gutterBottom>
                {loginFailed}
              </Typography>
            )
          }
          <FormControl margin="normal" required fullWidth error={this.state.emailError}>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input id="email" name="email" value={this.state.email} onChange={this.handleEmailChange} autoComplete="email" autoFocus />
            {
              this.state.emailError &&
              (<FormHelperText id="component-error-text">{this.state.emailError}</FormHelperText>)
            }
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input name="password" type="password" id="password" autoComplete="current-password" value={this.state.password} onChange={this.handlePasswordChange} />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Login
          </Button>
          <FacebookButton responseFacebook={this.responseFacebook} />
        </form>
      </Layout>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, props) => {
  return {
    loginFailed: state.auth.loginFailed,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    login: (props) => dispatch(login(props)),
    socialLogin: (props) => dispatch(socialLogin(props)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));