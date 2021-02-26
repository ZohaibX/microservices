import {
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILED,
  FETCH_USERS_PENDING,
} from './actionTypes';
import axios from 'axios';

export const fetchUsers = async (dispatch?: any) => {
  dispatch({ type: FETCH_USERS_PENDING });
  try {
    const { data } = await axios.get(
      'https://jsonplaceholder.typicode.com/users'
    );

    dispatch({ type: FETCH_USERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_USERS_FAILED, payload: error });
  }
};

// import {
//   REQUEST_ROBOTS_PENDING,
//   REQUEST_ROBOTS_SUCCESS,
//   REQUEST_ROBOTS_FAILED,
// } from './actionTypes';
// import axios from 'axios';

// Setting search text in a state
// export const setUserToken = (token) => ({
//   // we wanna recieve text here
//   type: UserToken,
//   payload: token,
// });

// async action function
// export const requestRobots = async (dispatch) => {
//   dispatch({ type: REQUEST_ROBOTS_PENDING });
//   try {
//     const { data } = await axios.get(
//       "https://jsonplaceholder.typicode.com/users"
//     );
//     dispatch({ type: REQUEST_ROBOTS_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({ type: REQUEST_ROBOTS_FAILED, payload: error });
//   }
// };
