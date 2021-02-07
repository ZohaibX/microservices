import { useEffect } from 'react';
import useRequest from './../../hooks/use-request';

const signOut = () => {
  const { doRequest } = useRequest('/api/users/signOut', {}, 'post');

  useEffect(() => {
    doRequest();
  }, []); // will run only once

  return (
    <div className=''>
      <h4 className='text-center my-5 font-weight-bolder'>
        You Are Signing Out
      </h4>
    </div>
  );
};

export default signOut;
