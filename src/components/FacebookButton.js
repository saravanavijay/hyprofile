import React from 'react';
import PropTypes from 'prop-types';
import FacebookLogin from 'react-facebook-login';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  fbButton: {
    width: '100%',
    marginTop: 20,
    backgroundColor: '#4C69BA',
    border: 'none',
    backgroundImage: 'linear-gradient(#4C69BA, #3B55A0)',
    boxSizing: 'border-box',
    padding: theme.spacing.unit,
    borderRadius: theme.shape.borderRadius,
    fontSize: '0.875rem',
    color: 'white',
    cursor: 'pointer',
    textTransform: 'uppercase',
    '&:focus': {
      outline: 'none',
    },
  }
});

function FacebookButton(props) {
  const { responseFacebook, classes } = props;
  return (
    <FacebookLogin
      appId="539118179905747"
      autoLoad={true}
      fields="name,email,picture"
      cssClass={classes.fbButton}
      // onClick={componentClicked}
      callback={responseFacebook} />
  )
}

FacebookButton.propTypes = {
  responseFacebook: PropTypes.func.isRequired,
};


export default withStyles(styles)(FacebookButton);