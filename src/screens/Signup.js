import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InsertEmoticon from '@material-ui/icons/InsertEmoticon';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import Layout from '../components/Layout';
import FacebookButton from '../components/FacebookButton';
import { validateEmail } from '../utils/validator';
import { registerUser, socialLogin } from '../modules/auth';

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
});

class Signup extends Component {
  state = {
    fullname: '',
    email: '',
    password: '',
    emailError: null,
  };

  handleFullnameChange = event => {
    this.setState({ fullname: event.target.value });
  };

  handleEmailChange = event => {
    this.setState({ email: event.target.value, emailError: null });
  };

  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { fullname, email, password } = this.state;
    const isEmailValid = validateEmail(email);
    if (!isEmailValid) {
      this.setState({ emailError: 'Email entered is Invalid.' });
      return;
    }
    this.props.registerUser({ fullname, email, password })

  }

  responseFacebook = (response) => {
    this.props.socialLogin(response);
  }

  render() {
    const { classes } = this.props;
    return (
      <Layout>
        <Avatar className={classes.avatar}>
          <InsertEmoticon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
          </Typography>
        <form className={classes.form} onSubmit={this.handleSubmit}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="name">Full Name</InputLabel>
            <Input id="name" name="name" autoComplete="name" value={this.state.fullname} onChange={this.handleFullnameChange} autoFocus />
          </FormControl>
          <FormControl margin="normal" required fullWidth error={this.state.emailError}>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input id="email" name="email" autoComplete="email" value={this.state.email} onChange={this.handleEmailChange} />
            {
              this.state.emailError &&
              (<FormHelperText id="component-error-text">{this.state.emailError}</FormHelperText>)
            }
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input name="password" type="password" id="password" value={this.state.password} onChange={this.handlePasswordChange} />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Signup
            </Button>
          <FacebookButton responseFacebook={this.responseFacebook} />
        </form>
      </Layout>
    );
  }

}

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, props) => {
  return {
    filteredPhotos: [],
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    registerUser: (props) => dispatch(registerUser(props)),
    socialLogin: (props) => dispatch(socialLogin(props)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Signup));