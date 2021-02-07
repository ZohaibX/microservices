import axios from 'axios';
import { useState } from 'react';
import Router from 'next/router';

const useRequest = (
  url: string,
  body: { email?: string; password?: string },
  method: string
) => {
  const [error, setError] = useState('');

  const doRequest = async () => {
    setError('');
    try {
      if (
        method === 'post' ||
        method === 'get' ||
        method === 'delete' ||
        method === 'put'
      ) {
        // if statement applied for TS
        const { data } = await axios[method](url, body);

        if (method === 'post') Router.push('/'); // i can add method properties in if statement time to time when needed
        return data;
      }
    } catch (e) {
      setError(e.response.data.message);
      return { error: { message: "couldn't post the request" } };
    }
  };

  return { doRequest, error }; // it is better to be in this format , rather than [doRequest , error]
};

export default useRequest;
