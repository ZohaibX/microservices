import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Routes from '../client/routes/routes';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { Helmet } from 'react-helmet';

import serialize from 'serialize-javascript';

const renderer = (req, store, context) => {
  // context, we are providing in context prop, it will send data into the renderer page on the browser
  // here , we are using it in NotFound Page
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={context}>
        <div>{renderRoutes(Routes)}</div>
      </StaticRouter>
    </Provider>
  );

  const helmet = Helmet.renderStatic(); //? to pull all the tags, we have provided to the components/pages

  // have added bootstrap,Materialize css cdn here
  return `
  <html>
  <head>
    ${helmet.title.toString()}
    ${helmet.meta.toString()}
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
    </head>
  <body>
  <div id="root">${content}</div>
  <script> window.INITIAL_STATE = ${serialize(store.getState())} </script>
  <script src="bundle.js" ></script>
  </body>
  </html>
  `;
};
// note -- all the meta tags for image, desc will be pull by ${helmet.meta.toString()}

export default renderer;
