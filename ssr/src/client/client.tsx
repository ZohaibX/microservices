//? Startup point for client side

import * as React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Home from './components/home';
import Routes from './routes/routes';

ReactDom.hydrate(
  <BrowserRouter>
    <Routes />
  </BrowserRouter>,
  document.querySelector('#root')
);

// important to use hydrate here
