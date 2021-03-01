import { combineReducers } from 'redux';
import { FetchCurrentUserReducer } from './current-user';
import { FetchUsersReducer } from './usersListReducer';
import { FetchAdminsReducer } from './admins';

const rootReducer = combineReducers({
  users: FetchUsersReducer,
  currentUser: FetchCurrentUserReducer,
  admins: FetchAdminsReducer,
});

export default rootReducer;
