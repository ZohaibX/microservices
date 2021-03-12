import React, { useEffect } from 'react';
import useRequest from './../../hooks/use-request';

const SignOut = () => {
  const { doRequest } = useRequest('/api/users/SignOut', {}, 'post');

  useEffect(() => {
    doRequest({ redirectPath: '/' });
  }, []); // will run only once

  return (
    <div className=''>
      <h4 className='text-center my-5 font-weight-bolder'>
        You Are Signing Out
      </h4>
    </div>
  );
};

export default {
  component: SignOut,
};
