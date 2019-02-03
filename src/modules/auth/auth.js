import axios from 'axios';
import { APP_URI } from '../../config';
import AuthHeaders from '../shared/header';

const apiEndpoints = {
  REGISTER_USER: `${APP_URI}/update`,
  LOGIN_USER: `${APP_URI}/update`,
};


// ------------------------------------
// Constants
// ------------------------------------

export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const LOGIN_USER_SUCCESS = 'REGISTER_USER_SUCCESS';

// ------------------------------------
// Actions
// ------------------------------------

const registerUserSuccess = (props) => ({
  type: REGISTER_USER_SUCCESS,
  user: props.user,
});

const loginUserSuccess = (props) => ({
  type: REGISTER_USER_SUCCESS,
  user: props.user,
});


export const actions = {
  registerUserSuccess,
  loginUserSuccess,
};


// ------------------------------------
// API Wrapper
// ------------------------------------

export const registerUser = (props) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        `${apiEndpoints.UPDATE_USER}`,
        {
        },
      );
      const result = res.data;
      if (result) {
        dispatch(actions.registerUserSuccess({ user: result }));
      }
    } catch (error) {

    }
  }
};

// ------------------------------------
// Reducers
// ------------------------------------

// export default (state = { selectedUser: null }, action) => {
//   switch (action.type) {
//     case UPDATE_USER_SUCCESS:
//       {
//         return { ...state, user: { ...state.user, ...action.user }, error: null };
//       }
//     default:
//       return state;
//   }
// };
