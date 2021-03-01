import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Routes from '../client/routes/routes';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { Helmet } from 'react-helmet';

import serialize from 'serialize-javascript';
// this works as JSON.stringify() but when some malicious script tag is placed as a normal data
// serialize will also replace that special script tag with a normal string
// and it will replace "<" ">" characters with their unit codes
//? the attack is called xss attack -- cross side script attack

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

  //! Difference btw renderToString() and renderToNodeStream

  // renderToString() -- we will send the request -- it will build all the data and will send back the response

  // renderToNodeStream() -- we will send req, it will build a small snippet/bid of data and will send response with that data
  // then, it will again build a small snippet of data and will send that
  // and this process will continue until all the data is send to the browser

  // renderToNodeStream() has a huge positive impact on performance, as its first bid of data will be tremendously faster to retrieve than the bid of renderToString()
  // as renderToNodeStream()'s first bid will be a small snippet and renderToString()'s 1st bid will be all the data

  // but there is a gotcha with this approach
  // if user go to the page, server will send 1st!! small snippet/bid of data instantaneously.
  // if user!!! , instantaneously, clicks a button to go on a page, he will instantaneously go to that page
  // but when 2nd!! or 3rd!! snippet of that data arrives... it comes to know that it had to redirect the user to home page due to some reason
  // so, user will not be redirected, once it has already opened the page

  // important -- thats y we will stick into the renderToString()

  const helmet = Helmet.renderStatic(); //? to pull all the tags, we have provided to the components/pages

  // have added Materialize css cdn here
  return `
  <html>
  <head>
    ${helmet.title.toString()}
    ${helmet.meta.toString()}
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
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
