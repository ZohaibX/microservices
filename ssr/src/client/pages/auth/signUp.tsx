import { useState, useEffect } from 'react';
import useRequest from '../../hooks/use-request';
import React from 'react';
import { Helmet } from 'react-helmet';
import AlreadySignedInHOC from '../../components/hocs/aleady-signed-in';
import { Redirect } from 'react-router-dom';

const SignUp = (props) => {
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

    doRequest({ redirectPath: '/' });
  };

  const head = () => (
    <Helmet>
      <title>{`Sign Up Here.`}</title>
      {/* // this is how we will make our title dynamic */}
      <meta property='og:title' content='Sign Up Here.'></meta>
      {/* //? https://ogp.me/ */}
    </Helmet>
  );

  return (
    <form action='' className='container' onSubmit={onSubmit}>
      {head()}
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

export default {
  component: AlreadySignedInHOC(SignUp),
};
