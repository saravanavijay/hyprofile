import axios from 'axios';
import { APP_URI } from '../../config';
import AuthHeaders from '../shared/header';

const apiEndpoints = {
  TEST_API: '/api/user',
  UPDATE_USER: `${APP_URI}/update`,
};


// ------------------------------------
// Constants
// ------------------------------------

export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';

// ------------------------------------
// Actions
// ------------------------------------

const updateUserSuccess = (props) => ({
  type: UPDATE_USER_SUCCESS,
  user: props.user,
});


export const actions = {
  updateUserSuccess,
};


// ------------------------------------
// API Wrapper
// ------------------------------------

export const testApi = (props) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `${apiEndpoints.TEST_API}`,
        // {
        //   post: 'hello'
        // },
        // AuthHeaders(),
      );
      const result = res.data;
      console.log(result);
      if (result) {
        // dispatch(actions.updateUserSuccess({ user: result }));
      }
    } catch (error) {
      const statusCode = error.response ? error.response.status : 0;
      switch (statusCode) {
        case 401:// bad request
          console.log('logout');
          break;
        default:
          console.log(statusCode);
      }
    }
  }
};

export const updateUser = (props) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `${apiEndpoints.UPDATE_USER}`,
        AuthHeaders(),
      );
      const result = res.data;
      if (result) {
        dispatch(actions.updateUserSuccess({ user: result }));
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
    case UPDATE_USER_SUCCESS:
      {
        return { ...state, user: { ...state.user, ...action.user }, error: null };
      }
    default:
      return state;
  }
};
