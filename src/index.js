import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Provider } from 'react-redux';
import App from './App';
import store from './store';
import { actions } from './modules/auth';

const isUserAuthenticated =  localStorage.getItem('userIsAuthenticated');
if (isUserAuthenticated === 'true') {
  store.dispatch(actions.authenticatedUser({}));
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));
