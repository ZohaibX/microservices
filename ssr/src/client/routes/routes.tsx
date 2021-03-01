import Home from '../pages/home';
import UsersList from '../pages/usersList';
import App from '../App';
import NotFound from '../pages/not-found';
import Admins from '../pages/admins';
import Test from './../pages/test';

export default [
  {
    ...App,
    routes: [
      { path: '/', ...Home, exact: true },
      { path: '/users', ...UsersList },
      { path: '/admins', ...Admins },
      { path: '/test', ...Test },
      { ...NotFound }, // this is how we use not-found page -- by not providing path
    ],
  },
];
