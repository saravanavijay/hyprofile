import React, { Component } from 'react';
import { connect } from 'react-redux';
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
import ReactFilestack from 'filestack-react';

import Layout from '../components/Layout';
import { validateEmail } from '../utils/validator';
import getter from '../utils/getter';

import { updateUser, updateUserImage } from '../modules/data/user';

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

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: props.user.email,
      emailError: null,
      isEditing: false,
    };
  }
  handleEmailChange = event => {
    let isEditing = true;
    const email = event.target.value;
    if (this.props.user.email === email) {
      isEditing = false;
    }
    this.setState({ email: event.target.value, emailError: null, isEditing });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email } = this.state;
    const isEmailValid = validateEmail(email);
    if (!isEmailValid) {
      this.setState({ emailError: 'Email entered is Invalid.' });
      return;
    }
    this.props.updateUser({ email });
  }

  onSuccess = (result) => {
    console.log(result);
    if (result && result.filesUploaded && result.filesUploaded.length > 0) {
      const imageUrl = getter(['url'], result.filesUploaded[0]) || null;
      this.props.updateUserImage({ imageUrl });
    }
  }
  onError = (error) => {

  }

  render() {
    const { classes, user } = this.props;
    return (
      <Layout>
        {
          <ReactFilestack
            apikey={'AtwBRJqLQSnm8oQWHy13Dz'}
            options={{
              accept: 'image/*',
              maxFiles: 1,
              storeTo: {
                location: 's3',
              },
            }}
            onSuccess={this.onSuccess}
            onError={this.onError}
            render={({ onPick }) => {
              if (user.imageUrl) {
                return (
                  <Avatar className={classes.avatar} src={user.imageUrl} onClick={onPick} />
                )
              }
              return (
                <Avatar className={classes.avatar} onClick={onPick}>
                  <CameraIcon />
                </Avatar>
              )
            }}
          />
        }

        <Typography component="h1" variant="h6" align="center">
          Welcome {user.fullname}
        </Typography>
        <form className={classes.form} onSubmit={this.handleSubmit}>
          <FormControl margin="normal" required fullWidth error={this.state.emailError}>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input id="email" name="email" value={this.state.email} onChange={this.handleEmailChange} autoComplete="email" />
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
            disabled={!this.state.isEditing}
          >
            Update
          </Button>
        </form>
      </Layout>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (props) => dispatch(updateUser(props)),
    updateUserImage: (props) => dispatch(updateUserImage(props)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Profile));