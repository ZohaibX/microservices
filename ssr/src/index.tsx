//? serving as a root file for the server

import express from 'express';
import renderer from './helpers-for-server/renderer';
const app = express();

app.use(express.static('public')); // very important line of code , to run js functionality
// if "*" does not work , i can directly use ingress-nginx thru http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/*
app.get('*', (req, res) => {
  res.send(renderer(req));
});

app.listen(3000, () => {
  console.log('Server Side of SSR running on port -- 3000');
});
