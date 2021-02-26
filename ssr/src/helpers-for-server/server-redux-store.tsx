// server side redux file

import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { FetchUsersReducer } from './../client/redux/2-reducers';

const rootReducer = combineReducers({ FetchUsersReducer }); // reducers will be coming from client folder
const logger = createLogger();

const CreateStore = () => {
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunkMiddleware)) // add (thunkMiddleware , logger ) if wish
  );
  // logger is for console

  return store;
}; // that's how we use store on the server side

export default CreateStore;
