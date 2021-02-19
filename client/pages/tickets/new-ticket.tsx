import { Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { useState, useEffect } from 'react';
import useRequest from '../../hooks/use-request';

export interface Props {}

const New = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');

  const { doRequest, error } = useRequest(
    '/api/tickets',
    { title, price },
    'post'
  );

  const onBlur = () => {
    // we want to round off the given price
    const value = parseFloat(price); // if the given price is a string
    // this will give a NaN if provided price is not a number
    if (isNaN(value)) return;

    setPrice(value.toFixed(2));
  };

  const onSubmit = (e: any) => {
    e.preventDefault();

    doRequest();
    console.log(error);
  };

  return (
    <div className='container' onSubmit={onSubmit}>
      <h1 className='my-5 text-center font-weight-bolder'>
        Create a New Ticket
      </h1>
      <form action=''>
        <div className='form-group'>
          <label htmlFor='Title'>Title</label>
          <input
            id='Title'
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
            className='form-control'
            type='text'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='Price'>Price</label>
          <input
            id='Price'
            value={price}
            onBlur={onBlur}
            // this onBlur fn will occur after unselecting an input field
            onChange={(e) => setPrice(e.currentTarget.value)}
            className='form-control'
            type='number'
          />
        </div>
        {error && <Alert severity='error'>{error}</Alert>}
        <br />
        <button className='btn btn-primary'>Create a Ticket</button>
      </form>
    </div>
  );
};

export default New;
