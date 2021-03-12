// server side redux file
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';
import rootReducer from './../client/Store/reducers/index';

import { createLogger } from 'redux-logger';
const logger = createLogger();

const CreateStore = (req) => {
  const serverAxiosInstance = axios.create({
    baseURL:
      'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api',
    headers: req.headers,
  });

  const store = createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(thunkMiddleware.withExtraArgument(serverAxiosInstance))
    ) // add (thunkMiddleware , logger ) if wish -- logger
  );

  return store;
}; // that's how we use store on the server side

export default CreateStore;
