//! must see the setup file

import request from 'supertest';
import { app } from '../../app';

it('returns 201 on successful sign up ', async () => {
  return request(app)
    .post('/api/users/signUp')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201);
});

it('throws an Error', async () => {
  return request(app)
    .post('/api/users/signUp')
    .send({ email: 'test', password: 'password' })
    .expect(400);
});

it('disallows duplicate emails', async () => {
  await request(app)
    .post('/api/users/signUp')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  await request(app)
    .post('/api/users/signUp')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(400);
});

it('sets a cookie header after successful sign up', async () => {
  const res = await request(app)
    .post('/api/users/signUp')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  expect(res.get('Set-Cookie')).toBeDefined();
  // get is a function to look at all the headers
});
