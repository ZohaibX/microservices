import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Routes from '../client/routes/routes';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';

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
  <script src="bundle.js" ></script>
  </body>
  </html>
  `;
};

export default renderer;
