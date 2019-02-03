import axios from 'axios';
import { APP_URI } from '../../config';
import getter from '../../utils/getter';

export const apiEndpoints = {
  USER: `${APP_URI}api/user`,
};


// ------------------------------------
// Constants
// ------------------------------------

export const AUTHENTICATED_USER = 'AUTHENTICATED_USER';
export const UNAUTHENTICATED_USER = 'UNAUTHENTICATED_USER';
export const USER_UPDATED = 'USER_UPDATED';

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

const userUpdated = (props) => ({
  type: USER_UPDATED,
  user: props.user,
});


export const actions = {
  authenticatedUser,
  unauthenticatedUser,
  userUpdated,
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
      if (result.success) {
        // dispatch(actions.authenticatedUser({ user: result.user }));
        dispatch(updateStateAndLocalStore({ user: result.user }));
      }
    } catch (error) {
      processError(error, dispatch);
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
      if (result.success) {
        dispatch(updateStateAndLocalStore({ user: result.user }));
        // dispatch(actions.authenticatedUser({ user: result.user }));
      }
    } catch (error) {
      processError(error, dispatch);
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
        dispatch(updateStateAndLocalStore({ user: result.user }));
        // dispatch(actions.authenticatedUser({ user: result.user }));
      }
    } catch (error) {
      processError(error, dispatch);
    }
  }
};

export const socialLogin = (props) => {
  return async (dispatch) => {
    console.log(props);
    const { email, name, picture } = props;
    const imageUrl = getter(['data', 'url'], picture) || '';
    if (!email || !name) {
      return;
    }

    try {
      const res = await axios.post(
        `${apiEndpoints.USER}/socialLogin`,
        {
          email,
          name,
          imageUrl,
        },
      );
      const result = res.data;
      if (result.success) {
        dispatch(updateStateAndLocalStore({ user: result.user }));
        // dispatch(actions.authenticatedUser({ user: result.user }));
      }
    } catch (error) {
      processError(error, dispatch);
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
        dispatch(updateStateAndLocalStore({ user: null }));
        // dispatch(actions.unauthenticatedUser());
      }
    } catch (error) {
      processError(error, dispatch);
    }
  }
};

export const verifyUser = (props) => {
  return async (dispatch) => {
    console.log(props);
    try {
      const res = await axios.post(
        `${apiEndpoints.USER}/verify`,
        props,
      );
      const result = res.data;
      console.log(result);
      if (result.success) {
        dispatch(updateStateAndLocalStore({ user: result.user }));
        // dispatch(actions.authenticatedUser({ user: result.user }));
      }
    } catch (error) {
      processError(error, dispatch);
    }
  }
};

function updateStateAndLocalStore(props) {
  return (dispatch) => {
    if (props.user) {
      localStorage.setItem('userIsAuthenticated', true);
      dispatch(actions.authenticatedUser({ user: props.user }));
    } else {
      localStorage.setItem('userIsAuthenticated', false);
      dispatch(actions.unauthenticatedUser());
    }
  }
}

// ------------------------------------
// Error Handler
// ------------------------------------

const processError = (error = {}, dispatch) => {
  const statusCode = error.response ? error.response.status : 0;
  switch (statusCode) {
    case 401:// Not authorised
      dispatch(updateStateAndLocalStore({}));
      break;
    case 403:// Forbidden
      //  redirect to home
      // history.push('/404');
      //  Show message
      break;
    case 404:// Page not found
      break;
    case 422:
    case 500:
    default:
      if (error.response && error.response.data) {
        const responseData = error.response.data;
        const message = responseData.message || 'Try again later';
        console.log(message);
      }
      break;
  }
};

// ------------------------------------
// Reducers
// ------------------------------------

export default (state = {}, action) => {
  switch (action.type) {
    case AUTHENTICATED_USER:
      return { ...state, authenticated: true, user: action.user, error: '' };
    case UNAUTHENTICATED_USER:
      return { ...state, authenticated: false, user: null, error: '' };
    case USER_UPDATED:
      return { ...state, user: { ...state.user, ...action.user } };
    default:
      return state;
  }
};
