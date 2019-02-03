import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import CameraIcon from '@material-ui/icons/CameraAlt';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import Layout from '../components/Layout';
import { validateEmail } from '../utils/validator';

const styles = theme => ({
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: '#A6A4A4',
    width: 60,
    height: 60,
    cursor: 'pointer',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    color: 'white',
  },
  input: {
    display: 'none',
  },
});

class Login extends Component {

  state = {
    email: 'saravana.vijay.kumar@gmail.com',
    emailError: null,
  };

  handleEmailChange = event => {
    this.setState({ email: event.target.value, emailError: null });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email } = this.state;
    const isEmailValid = validateEmail(email);
    if (!isEmailValid) {
      this.setState({ emailError: 'Email entered is Invalid.' });
      return;
    }
  }

  responseFacebook = (response) => {
    console.log(response);
  }

  render() {
    const { classes } = this.props;
    return (
      <Layout>

        <input
          accept="image/*"
          className={classes.input}
          id="text-button-file"
          type="file"
        />
        <label htmlFor="text-button-file">
          <Avatar className={classes.avatar}>
            <CameraIcon />
          </Avatar>
        </label>
        <Typography component="h1" variant="h5">
          {'Saravana Vijay'}
        </Typography>
        <form className={classes.form} onSubmit={this.handleSubmit}>
          <FormControl margin="normal" required fullWidth error={this.state.emailError}>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input id="email" name="email" value={this.state.email} onChange={this.handleEmailChange} autoComplete="email" autoFocus />
            {
              this.state.emailError &&
              (<FormHelperText id="component-error-text">{this.state.emailError}</FormHelperText>)
            }
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Update
          </Button>
        </form>
      </Layout>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);