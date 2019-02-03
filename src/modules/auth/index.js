import axios from 'axios';
import { APP_URI } from '../../config';
import AuthHeaders from '../shared/header';

const apiEndpoints = {
  USER: `${APP_URI}api/user`,
  LOGIN_USER: `${APP_URI}/update`,
};


// ------------------------------------
// Constants
// ------------------------------------

export const AUTHENTICATED_USER = 'AUTHENTICATED_USER';
export const UNAUTHENTICATED_USER = 'UNAUTHENTICATED_USER';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const LOGIN_USER_SUCCESS = 'REGISTER_USER_SUCCESS';

// ------------------------------------
// Actions
// ------------------------------------

const authenticatedUser = (props) => ({
  type: AUTHENTICATED_USER,
  user: props.user,
});

const unauthenticatedUser = () => ({
  type: UNAUTHENTICATED_USER,
});

const registerUserSuccess = (props) => ({
  type: REGISTER_USER_SUCCESS,
  user: props.user,
});

const loginUserSuccess = (props) => ({
  type: REGISTER_USER_SUCCESS,
  user: props.user,
});


export const actions = {
  authenticatedUser,
  unauthenticatedUser,
  registerUserSuccess,
  loginUserSuccess,
};


// ------------------------------------
// API Wrapper
// ------------------------------------

export const getUser = (props) => {
  return async (dispatch) => {
    console.log(props);
    try {
      const res = await axios.get(
        `${apiEndpoints.USER}`,
      );
      const result = res.data;
      console.log(result);
      if (result) {
        dispatch(actions.authenticatedUser({ user: result.user }));
      }
    } catch (error) {

    }
  }
};


export const registerUser = (props) => {
  return async (dispatch) => {
    console.log(props);
    try {
      const res = await axios.post(
        `${apiEndpoints.USER}`,
        props,
      );
      const result = res.data;
      console.log(result);
      if (result) {
        // dispatch(actions.registerUserSuccess({ user: result }));
      }
    } catch (error) {

    }
  }
};

export const login = (props) => {
  return async (dispatch) => {
    console.log(props);
    try {
      const res = await axios.post(
        `${apiEndpoints.USER}/login`,
        props,
      );
      const result = res.data;
      console.log(result);
      if (result.success) {
        dispatch(actions.authenticatedUser({ user: result.user }));
      }
    } catch (error) {

    }
  }
};

export const logout = (props) => {
  return async (dispatch) => {
    console.log(props);
    try {
      const res = await axios.post(
        `${apiEndpoints.USER}/logout`,
      );
      const result = res.data;
      console.log(result);
      if (result.success) {
        dispatch(actions.unauthenticatedUser());
      }
    } catch (error) {

    }
  }
};

// ------------------------------------
// Reducers
// ------------------------------------

export default (state = { }, action) => {
  switch (action.type) {
    case AUTHENTICATED_USER:
      return { ...state, authenticated: true, user: action.user, error: '' };
    case UNAUTHENTICATED_USER:
      return { ...state, authenticated: false, user: null, error: '' };
    default:
      return state;
  }
};
