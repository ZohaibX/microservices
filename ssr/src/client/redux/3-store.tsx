import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { FetchUsersReducer } from './2-reducers';

const rootReducer = combineReducers({ FetchUsersReducer }); // add reducers here
const logger = createLogger();

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware, logger))
);
// logger is for console

export default store;
