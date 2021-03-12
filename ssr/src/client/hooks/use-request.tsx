import axios from 'axios';
import { useState } from 'react';

const useRequest = (url: string, body: {}, method: string) => {
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
        if (method === 'post' && props.redirectPath)
          window.location = props.redirectPath;
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
