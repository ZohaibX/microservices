import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';
import rootReducer from '../reducers/index';

import { createLogger } from 'redux-logger';
const logger = createLogger();

// God way of adding some property to some built-in method
declare global {
  interface Window {
    INITIAL_STATE: any;
  }
}

const axiosInstance = axios.create({
  baseURL: '/api',
});
// if any request comes to the browser as '/users'
// it will go to '/api/users'
// then, '/api/auth' will go to the server - index.ts and will attach to the proxy route

// window.INITIAL_STATE must be defined on the server -- on the renderer file
const store = createStore(
  rootReducer,
  window.INITIAL_STATE,
  composeWithDevTools(
    applyMiddleware(thunkMiddleware.withExtraArgument(axiosInstance))
  ) // add (thunkMiddleware , logger ) if wish -- logger
);
// logger is for console

export default store;
