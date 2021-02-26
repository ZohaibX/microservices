import Home from '../components/home';
import Tickets, { loadData } from './../pages/tickets';

const Routes = [
  { path: '/', component: Home, exact: true },
  { loadData, path: '/tickets', component: Tickets },
];

export default Routes;
