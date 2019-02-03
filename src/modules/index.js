import { combineReducers } from 'redux';
import userReducer from './data/user';
// import authReducer from './auth/auth';

export default combineReducers({
  user: userReducer,
  // auth: authReducer,
});