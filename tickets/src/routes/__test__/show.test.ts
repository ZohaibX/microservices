import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../model/ticket';
import mongoose from 'mongoose';

it('returns a 404 if route is unrecognized ', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app).get(`/api/tickets/${id}`).send({}).expect(404);
});

it('will not return a 404, if the route /api/tickets is found', async () => {
  const res = await request(app).get('/api/tickets').send({});
  expect(res.status).not.toEqual(404); // 404 comes from NotFoundError()
});

it('returns the ticket if it is found', async () => {
  const response1 = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signUp())
    .send({ title: 'ticket1', price: 23 })
    .expect(201);

  const response2 = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signUp())
    .send({ title: 'ticket2', price: 23 })
    .expect(201);

  const tickets = await request(app).get('/api/tickets').send({});
  expect(tickets.body.length).toEqual(2); // to show all the tickets

  const ticket = await request(app)
    .get(`/api/tickets/${response1.body.id}`)
    .send({});
  // console.log(ticket.body);
  expect(ticket.body.price).toEqual(23); // to show a specific ticket
});
