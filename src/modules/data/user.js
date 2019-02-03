import axios from 'axios';
import { actions, apiEndpoints } from '../auth';

// ------------------------------------
// API Wrapper
// ------------------------------------


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
