import React from 'react';
import { Route } from 'react-router-dom';
import Home from '../components/home';
import Test from '../pages/test';

const Routes = () => {
  return (
    <div>
      <Route exact path='/' component={Home} />
      <Route path='/test' component={Test} />
    </div>
  );
};

export default Routes;
