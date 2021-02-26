//? serving as a root file for the server

import 'babel-polyfill'; // to use async await
import express from 'express';
import { matchRoutes } from 'react-router-config';
import Routes from './client/routes/routes';
import renderer from './helpers-for-server/renderer';
import CreateStore from './helpers-for-server/server-redux-store';

const app = express();

app.use(express.static('public')); // very important line of code , to run js functionality
// if "*" does not work , i can directly use ingress-nginx thru http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/*
app.get('*', (req, res) => {
  const store = CreateStore();

  // some logic to initialize and load data into store
  const promises = matchRoutes(Routes, req.path).map(({ route }: any) => {
    return route.loadData ? route.loadData(store) : null;
  });

  Promise.all(promises).then(() => {
    res.send(renderer(req, store));
  });
});

app.listen(3000, () => {
  console.log('Server Side of SSR running on port -- 3000');
});
