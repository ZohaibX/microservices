//? serving as a root file for the server

import 'babel-polyfill'; // to use async await
import express from 'express';
import { matchRoutes } from 'react-router-config';
import Routes from './client/routes/routes';
import renderer from './helpers-for-server/renderer';
import proxy from 'express-http-proxy';
import CreateStore from './helpers-for-server/server-redux-store';

const app = express();

app.use(express.static('public'));
app.get('*', (req, res) => {
  const store = CreateStore(req);

  const promises = matchRoutes(Routes, req.path)
    .map(({ route }) => {
      return route.loadData ? route.loadData(store) : null;
    })
    .map((promise) => {
      if (promise) {
        return new Promise((resolve, reject) => {
          promise.then(resolve).catch(resolve);
        });
      }
    });

  Promise.all(promises).then(() => {
    const context = {};
    const content = renderer(req, store, context);

    if (context.url) {
      console.log('context url is: ', context.url);
      return res.redirect(301, context.url);
    } // will handle redirection
    // this is how i may redirect to the url, user was already redirected from
    if (context.notFound) res.status(404); // this setting is for notFoundPage

    res.send(content);
  });
});

app.listen(3000, () => {
  console.log('Server Side of SSR running on port -- 3000');
});
