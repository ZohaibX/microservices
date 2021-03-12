import Home from '../pages/home';
import Test from '../pages/test';
import App from '../App';
import NotFound from '../pages/not-found';
import SignUp from '../pages/auth/signUp';
import SignIn from '../pages/auth/signIn';
import SignOut from '../pages/auth/signOut';

export default [
  {
    ...App,
    routes: [
      { path: '/', ...Home, exact: true },
      { path: `/test`, ...Test },
      { path: '/signUp', ...SignUp, exact: true },
      { path: '/signIn', ...SignIn },
      { path: '/signOut', ...SignOut },
      { ...NotFound }, // this is how we use not-found page -- by not providing path
    ],
  },
];
