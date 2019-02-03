import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import allReducers from './modules/index';

const middleware = [
  thunk,
  createLogger(),
]

export default createStore(
  allReducers,
  compose(applyMiddleware(...middleware)),
);
