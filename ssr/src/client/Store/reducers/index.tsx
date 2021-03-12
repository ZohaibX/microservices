import { combineReducers } from 'redux';
import { FetchCurrentUserReducer } from './current-user';

const rootReducer = combineReducers({
  currentUser: FetchCurrentUserReducer,
});

export default rootReducer;
