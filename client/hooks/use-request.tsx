import axios from 'axios';
import { useState } from 'react';
import Router from 'next/router';

const useRequest = (
  url: string,
  body: {
    email?: string;
    password?: string;
    title?: string;
    price?: string;
    ticketId?: string;
    orderId?: string;
  },
  method: string
) => {
  const [error, setError] = useState('');

  const doRequest = async (props: any = {}) => {
    setError('');
    try {
      if (
        method === 'post' ||
        method === 'get' ||
        method === 'delete' ||
        method === 'put'
      ) {
        // if statement applied for TS
        const { data } = await axios[method](url, {
          ...body,
          ...props,
        });
        // console.log(data);

        if (url === '/api/orders')
          Router.push('/orders/[orderId]', `/orders/${data.id}`);
        if (url === '/api/payments') Router.push('/orders/');
        if (url === '/api/users/signUp' || url === '/api/users/signIn')
          Router.push('/'); // i can add method properties in if statement time to time when needed
        if (url === '/api/tickets' && method === 'post') Router.push('/'); // i can add method properties in if statement time to time when needed
        return data;
      }
    } catch (e) {
      // console.log(e.response.data);
      if (e.response.data.errors[0])
        setError(e.response.data.errors[0].message.toUpperCase());
      else setError(e.response.data.message);
      return { error: { message: "couldn't make the request" } };
    }
  };

  return { doRequest, error }; // it is better to be in this format , rather than [doRequest , error]
};

export default useRequest;
