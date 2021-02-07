import { useState, useEffect } from 'react';
import useRequest from '../../hooks/use-request';
import Router from 'next/router';
// import { UserData } from '../../components/header';

const signUp = ({ userData }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, error } = useRequest(
    '/api/users/signUp',
    { email, password },
    'post'
  );

  useEffect(() => {
    // console.log(Router.pathname);
    // console.log(userData);
  }, []);

  const onSubmit = async (e: any) => {
    e.preventDefault();

    doRequest(); // all requesting logic is inside this custom hook
  };

  return (
    <form action='' className='container' onSubmit={onSubmit}>
      <h1 className='text-center my-5 font-weight-bolder'>Sign Up</h1>
      <div className='form-group'>
        <label htmlFor=''>Email Address</label>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          className='form-control'
        />
      </div>
      <div className='form-group'>
        <label htmlFor=''>Password</label>
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          className='form-control'
        />
      </div>
      {error && (
        <div className='alert alert-danger'>
          <h4>Oops...</h4>
          {error.toUpperCase()}
        </div>
      )}
      <button className='btn btn-primary'>Sign Up</button>
    </form>
  );
};

export default signUp;
