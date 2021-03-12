import { useState } from 'react';
import useRequest from '../../hooks/use-request';
import React from 'react';
import { Helmet } from 'react-helmet';
import AlreadySignedInHOC from '../../components/hocs/aleady-signed-in';

const SignIn = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { doRequest, error } = useRequest(
    '/api/users/signIn',
    { email, password },
    'post'
  );

  React.useEffect(() => {
    console.log(props);
  }, []);

  const onSubmit = async (e: any) => {
    e.preventDefault();

    // const location = state.state ? state.state.from.pathname : '/';
    doRequest({ redirectPath: '/' }); // all requesting logic is inside this custom hook
  };

  const head = () => (
    <Helmet>
      <title>{`Yo! Sign In.`}</title>
      {/* // this is how we will make our title dynamic */}
      <meta property='og:title' content='Yo! Sign In.'></meta>
      {/* //? https://ogp.me/ */}
    </Helmet>
  );

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

export default {
  component: AlreadySignedInHOC(SignIn),
};
