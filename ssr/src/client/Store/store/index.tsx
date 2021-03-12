import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';
import rootReducer from '../reducers/index';

import { createLogger } from 'redux-logger';
const logger = createLogger();

declare global {
  interface Window {
    INITIAL_STATE: any;
  }
}

const axiosInstance = axios.create({
  baseURL: '/api',
});

const store = createStore(
  rootReducer,
  window.INITIAL_STATE,
  composeWithDevTools(
    applyMiddleware(thunkMiddleware.withExtraArgument(axiosInstance))
  ) // add (thunkMiddleware , logger ) if wish -- logger
);
// logger is for console

export default store;
