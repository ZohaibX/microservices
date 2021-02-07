import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const BuildClient = ({ req }: any) => {
  // console.log(req.headers);
  //? req is same like we have in express
  // this function runs on server side when a hard refresh is made , or we type url
  // and it runs on client side when we are routed by some other page in the app

  //! All the reasoning is in notes - next-important-points
  if (typeof window === 'undefined') {
    // that means we are in the server side
    return axios.create({
      baseURL:
        'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      headers: req.headers,
    });
  } else {
    // we are in browser -- client container
    return axios.create({
      baseURL: '/', // in browser, http://ticketing.dev will be automatically attached
    });
  }
};

//? axios.create -- this function will return us axios properties with the properties, we configured
//? this is used in index.tsx

export default BuildClient;
