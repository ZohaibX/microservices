import express from 'express';
import 'express-async-errors'; //! this is very important package to handle async errors
//! otherwise, we would have to use next(new Error) instead of throwing an error simply

import { json, urlencoded } from 'body-parser';

// we are having this extra app file for express because we don't want port issues during tests
import Routes from './routes/service';
import cookieSession from 'cookie-session';
import { currentUser, errorHandler, NotFoundError } from '@zbtickets/common';

const app = express();
app.set('trust proxy', true); // it will accept every kind of traffic, believing it is coming from nginx

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(urlencoded({ extended: true }));
app.use(json());

app.use(
  cookieSession({
    signed: false, // we are not encrypting our cookie bcoz we are gonna send jwt (which is itself encrypted) inside that cookie
    // but if we have to make it more secured-- we can sign the cookie -- example at express repo in github
    // reason is -- if we use different backend languages in MS's - then it would be difficult for other languages to decrypt the cookie
    // secure: process.env.NODE_ENV !== 'test',
    //? make it secure when having https
    // secure means cookie session will only work on the https connection
  })
);
app.use(currentUser); // so the whole app could use currentUser
// app.use((req, res, next) => {
//   if (req.session?.jwt) console.log('req.session.jwt is: ', req.session.jwt);
//   console.log('req.currentUser is: ', req.currentUser);
//   next();
// });

Routes(app);

console.log('test');
app.all('*', async (req, res) => {
  // if route is not recognized, we will just throw a not found error
  console.log('This is a global error handler at route level....');
  throw new NotFoundError();
});

app.use(errorHandler); // it is just a reference of error middleware for error handling
//! must be used on the last

export { app };
