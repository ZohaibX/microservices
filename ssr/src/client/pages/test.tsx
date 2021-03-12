import * as React from 'react';
import { withRouter } from 'react-router-dom';
import RequireAuth from '../components/hocs/require-auth';

const Test = () => {
  return (
    <div className='container-fluid'>
      <h1 className='text-center my-5 font-weight-bolder'>Im a test Page</h1>
    </div>
  );
};

export default {
  component: withRouter(RequireAuth(Test)),
};
