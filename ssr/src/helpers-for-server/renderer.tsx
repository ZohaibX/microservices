import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Routes from '../client/routes/routes';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';

import serialize from 'serialize-javascript';
// this works as JSON.stringify() but when some malicious script tag is placed as a normal data
// serialize will also replace that special script tag with a normal string
// and it will replace "<" ">" characters with their unit codes
//? the attack is called xss attack -- cross side script attack

const renderer = (req: any, store: any) => {
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={{}}>
        <div>{renderRoutes(Routes)}</div>
      </StaticRouter>
    </Provider>
  );

  return `
  <html>
  <head></head>
  <body>
  <div id="root">${content}</div>
  <script> window.INITIAL_STATE = ${serialize(store.getState())} </script>
  <script src="bundle.js" ></script>
  </body>
  </html>
  `;
};

export default renderer;
