import axios from 'axios';
import { actions, apiEndpoints } from '../auth';

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


export const updateUserImage = (props) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(
        `${apiEndpoints.USER}`,
        props,
      );
      const result = res.data;
      console.log(result);
      if (result.success) {
        dispatch(actions.userUpdated( { user: result.user }));
      }
    } catch (error) {

    }
  }
};

export const updateUser = (props) => {
  return async (dispatch) => {
    try {
      const res = await axios.patch(
        `${apiEndpoints.USER}`,
        props,
      );
      const result = res.data;
      console.log(result);
      if (result.success) {
        dispatch(actions.userUpdated( { user: result.user }));
      }
    } catch (error) {

    }
  }
};
