import Home from '../pages/home';
import Tickets from './../pages/tickets';

const Routes = [
  { path: '/', ...Home, exact: true },
  { path: '/tickets', ...Tickets },
];

export default Routes;
