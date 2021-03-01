import * as React from 'react';
import { renderRoutes } from 'react-router-config';
import Header from './components/header';
import { fetchCurrentUser } from './Store/actions';

// any route, that is matched by matchRoutes fn, will be passed to this App
const App = ({ route }) => {
  return (
    <div>
      <Header />
      {renderRoutes(route.routes)}
    </div>
  );
};

// function loadData(store) {
//   //? Here, we will load currentUser Data
//   if (store) {
//     if (store.dispatch) {
//       return store.dispatch(fetchCurrentUser());
//     }
//   }
// }

export default {
  component: App,
  loadData: ({ dispatch }) => dispatch(fetchCurrentUser()),
};
