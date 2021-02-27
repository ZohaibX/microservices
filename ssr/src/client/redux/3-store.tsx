import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { FetchUsersReducer } from './2-reducers';

// God way of adding some property to some built-in method
declare global {
  interface Window {
    INITIAL_STATE: any;
  }
}

const rootReducer = combineReducers({ FetchUsersReducer }); // add reducers here
const logger = createLogger();

// window.INITIAL_STATE must be defined on the server -- on the renderer file
const store = createStore(
  rootReducer,
  window.INITIAL_STATE,
  composeWithDevTools(applyMiddleware(thunkMiddleware)) // add (thunkMiddleware , logger ) if wish
);
// logger is for console

export default store;
