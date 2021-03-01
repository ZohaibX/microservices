export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_PENDING = 'FETCH_USERS_PENDING';
export const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED';

//? async requests - way
export const fetchUsers = () => async (dispatch, getState, api) => {
  //? api: axiosInstance , we sent this in the store . details are there
  dispatch({ type: FETCH_USERS_PENDING });
  try {
    const { data } = await api.get('/users');

    dispatch({ type: FETCH_USERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_USERS_FAILED, payload: error });
  }
};

export const FETCH_CURRENT_USER = 'FETCH_CURRENT_USER';
//? async requests - way
export const fetchCurrentUser = () => async (dispatch, getState, api) => {
  //? api: axiosInstance , we sent this in the store . details are there

  const { data } = await api.get('/current_user');
  dispatch({ type: FETCH_CURRENT_USER, payload: data });
};

export const FETCH_ADMINS = 'FETCH_ADMINS';

//? async requests - way
export const fetchAdmins = () => async (dispatch, getState, api) => {
  //? api: axiosInstance , we sent this in the store . details are there

  const { data } = await api.get('/admins');
  dispatch({ type: FETCH_ADMINS, payload: data });
};

//? sync reducer action
// Setting search text in a state
// export const setUserToken = (token) => ({
//   // we wanna recieve text here
//   type: UserToken,
//   payload: token,
// });
