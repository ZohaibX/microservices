import SignUpRoute from './signUp';
import SignInRoute from './signIn';
import SignOutRoute from './signOut';
import CurrentUserRoute from './currentUser';

export default (app: any) => {
  // routes
  app.use(CurrentUserRoute);
  app.use(SignInRoute);
  app.use(SignUpRoute);
  app.use(SignOutRoute);
};
