export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_PENDING = 'FETCH_USERS_PENDING';
export const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED';

export const FETCH_CURRENT_USER = 'FETCH_CURRENT_USER';
//? async requests - way
export const fetchCurrentUser = () => async (dispatch, getState, api) => {
  //? api: axiosInstance , we sent this in the store . details are there

  const { data } = await api.get('/users/currentUser');
  dispatch({ type: FETCH_CURRENT_USER, payload: data.currentUser });
};

//? sync reducer action
// Setting search text in a state
// export const setUserToken = (token) => ({
//   // we wanna recieve text here
//   type: UserToken,
//   payload: token,
// });
