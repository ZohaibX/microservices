import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Routes from '../client/routes/routes';

const renderer = (req: any) => {
  const content = renderToString(
    <StaticRouter location={req.path} context={{}}>
      <Routes />
    </StaticRouter>
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
