import { useState } from 'react';
import useRequest from '../../hooks/use-request';

const signIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, error } = useRequest(
    '/api/users/signIn',
    { email, password },
    'post'
  );

  const onSubmit = async (e: any) => {
    e.preventDefault();

    doRequest(); // all requesting logic is inside this custom hook
  };

  return (
    <form action='' className='container' onSubmit={onSubmit}>
      <h1 className='text-center my-5 font-weight-bolder'>Sign In</h1>
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
      <button className='btn btn-primary'>Sign In</button>
    </form>
  );
};

export default signIn;
