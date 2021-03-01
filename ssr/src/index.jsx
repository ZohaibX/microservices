//? serving as a root file for the server

import 'babel-polyfill'; // to use async await
import express from 'express';
import { matchRoutes } from 'react-router-config';
import Routes from './client/routes/routes';
import renderer from './helpers-for-server/renderer';
import proxy from 'express-http-proxy';
import CreateStore from './helpers-for-server/server-redux-store';

const app = express();

app.use(
  '/api',
  proxy('http://react-ssr-api.herokuapp.com', {
    proxyReqOptDecorator(opts) {
      opts.headers['x-forwarded-host'] = 'localhost:3000';
      return opts;
    },
  })
);
//? so every request coming with '/api' , /api will be replaced with the provided domain name

//? proxy setup is only gonna handle requests coming from browser, and not from server
//? so, only provide the domain name, that can be handled by browser
//? may be in micro-services and k8s, we could only use '/' this

//? and we can use ingress-nginx way in the server side redux store -- where server requests will be handled
// important - 2nd option is only for this course -- just to easily pass the google auth security measures

app.use(express.static('public')); // very important line of code , to run js functionality
// if "*" does not work , i can directly use ingress-nginx thru http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/*
app.get('*', (req, res) => {
  const store = CreateStore(req);

  // some logic to initialize and load data into store
  const promises = matchRoutes(Routes, req.path)
    .map(({ route }) => {
      return route.loadData ? route.loadData(store) : null;
    })
    .map((promise) => {
      if (promise) {
        return new Promise((resolve, reject) => {
          promise.then(resolve).catch(resolve); // always render the page and not stuck if get some error from backend
        });
      }
    });
  // 2nd map statement is to catch errors, coming from backend -

  Promise.all(promises).then(() => {
    const context = {};
    const content = renderer(req, store, context);

    console.log('context is:', context);
    if (context.url) return res.redirect(301, context.url); // will handle redirection
    // this is how i may redirect to the url, user was already redirected from
    if (context.notFound) res.status(404); // this setting is for notFoundPage

    res.send(content);
  });
});

app.listen(3000, () => {
  console.log('Server Side of SSR running on port -- 3000');
});
