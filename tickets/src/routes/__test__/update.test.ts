import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { natsWrapper } from '../../services/nats/nats-wrapper';
//? we imported real natsWrapper but jest will replace it with mock one

it('does not return a 404 if route is found', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', global.signUp())
    .send({ title: 'idsocs', price: 12 })
    .expect(404); // 404 coming from NotFoundError()
});

it('returns a 401 if user is not authenticated', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/tickets/${id}`)
    .send({ title: 'idsocs', price: 12 })
    .expect(401); // 404 coming from UnAuthorizedError()
});

it('returns a 401 if user is not authorized', async () => {
  const res = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signUp())
    .send({ title: 'jkdjsjsd', price: 32 })
    .expect(201);

  // every time, a global.signUp() will create a different cookie with the payload
  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set('Cookie', global.signUp())
    .send({ title: 'jkdshjdks', price: 21 })
    .expect(401); // going to the previous created ticket with a different user -- not authorized error
});

it('return 400 when provided input is invalid', async () => {
  const cookie = global.signUp();

  const res = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie) // for same cookie on both
    .send({ title: 'jkdjsjsd', price: 32 })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set('Cookie', cookie) // for same cookie on both
    .send({ title: '', price: 21 })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set('Cookie', cookie) // for same cookie on both
    .send({ title: 'lds;,ads', price: -2 })
    .expect(400);
});

it('updates a ticket', async () => {
  const cookie = global.signUp();

  const res = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie) // for same cookie on both
    .send({ title: 'jkdjsjsd', price: 32 })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set('Cookie', cookie) // for same cookie on both
    .send({ title: 'updated1', price: 21 })
    .expect(200);

  const ticket = await request(app).get(`/api/tickets/${res.body.id}`).send({});
  expect(ticket.body.title).toEqual('updated1');
});

it('publishes an event', async () => {
  const cookie = global.signUp();

  const res = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie) // for same cookie on both
    .send({ title: 'jkdjsjsd', price: 32 })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set('Cookie', cookie) // for same cookie on both
    .send({ title: 'updated1', price: 21 })
    .expect(200);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
