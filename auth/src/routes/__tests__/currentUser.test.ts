//! must see the setup file

import request from 'supertest';
import { app } from '../../app';

it('responds with the details of the current user', async () => {
  // normally -- in the browser or a postman -- when we sign up -- we will get cookies
  // and when we go to currentUser route, browser  and postman automatically associates that cookie with the currentUser route
  // and currentUser route will return data extracted by that cookie

  // but supertest is not like browser or postman
  //? so we will add here the cookie

  const cookie = await global.signUp(); // coming from setup.ts file

  const res = await request(app)
    .get('/api/users/currentUser')
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(res.body.currentUser.email).toEqual('test@test.com');
});

it('responds with null if not authenticated', async () => {
  const res = await request(app)
    .get('/api/users/currentUser')
    .send()
    .expect(200);

  expect(res.body.currentUser).toEqual(null);
});
