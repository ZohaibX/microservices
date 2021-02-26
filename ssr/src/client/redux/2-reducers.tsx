import {
  FETCH_USERS_PENDING,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILED,
} from './actionTypes';

const usersInitialState = {
  isPending: false,
  users: [],
  error: '',
};
// async reducer function
export const FetchUsersReducer = (state = usersInitialState, action) => {
  if (action.type === FETCH_USERS_PENDING) {
    return { ...state, isPending: true };
  } else if (action.type === FETCH_USERS_SUCCESS) {
    return { ...state, users: action.payload, isPending: false };
  } else if (action.type === FETCH_USERS_FAILED) {
    return { ...state, error: action.payload, isPending: false };
  } else return state;
};

// it takes the action and spits out the state
// import { UserToken } from "./actionTypes";

// const initialStateSearch = {
//   userToken: "",
// };

// we cannot change our state . so we will have to recreate it with some changes we need
// export const userToken = (state = initialStateSearch, action = {}) => {
//   if (action.type === UserToken) {
//     console.log(action.payload);
//     return { ...state, userToken: action.payload };
//   } else return state; // reducers must be returning something
// };

// import {
//   REQUEST_ROBOTS_PENDING,
//   REQUEST_ROBOTS_SUCCESS,
//   REQUEST_ROBOTS_FAILED,
// } from "./actionTypes";

// const initialStateRobots = {
//   isPending: false,
//   robots: [],
//   error: "",
// };
// // async reducer function
// export const requestRobots = (state = initialStateRobots, action = {}) => {
//   if (action.type === REQUEST_ROBOTS_PENDING) {
//     return { ...state, isPending: true };
//   } else if (action.type === REQUEST_ROBOTS_SUCCESS) {
//     return { ...state, robots: action.payload, isPending: false };
//   } else if (action.type === REQUEST_ROBOTS_FAILED) {
//     return { ...state, error: action.payload, isPending: false };
//   } else return state;
// };
