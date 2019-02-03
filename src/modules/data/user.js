import axios from 'axios';
import { APP_URI } from '../../config';
import AuthHeaders from '../shared/header';

const apiEndpoints = {
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

export default (state = { selectedUser: null }, action) => {
  switch (action.type) {
    case UPDATE_USER_SUCCESS:
      {
        return { ...state, user: { ...state.user, ...action.user }, error: null };
      }
    default:
      return state;
  }
};
