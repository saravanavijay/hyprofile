import { combineReducers } from 'redux';
import authReducer from './auth';

export default combineReducers({
  // user: userReducer,
  auth: authReducer,
});