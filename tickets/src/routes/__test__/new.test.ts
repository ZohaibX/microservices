import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../model/ticket';
import { natsWrapper } from '../../services/nats/nats-wrapper';
//? we imported real natsWrapper but jest will replace it with mock one

it('has a route handler listening to some recognized route for post request', async () => {
  const res = await request(app).post('/api/tickets').send({});

  expect(res.status).not.toEqual(404); // that will come from NotFoundError() if route is not recognized
});

// it will fail when we are signed in
// it('can not be accessed if the user is not signed in', async () => {
//   await request(app).post('/api/tickets').send({}).expect(401); // 401 will come from NotAuthorizedError()
// });

it('returns status other than 401  if the user is signed in', async () => {
  const res = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signUp())
    .send({}); // 401 will come from NotAuthorizedError()
  expect(res.status).not.toEqual(401);
});

it('returns an error if the invalid title is provided', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signUp())
    .send({
      title: '',
      price: 10,
    })
    .expect(400); // 400 will come from Error()

  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signUp())
    .send({
      price: 10,
    })
    .expect(400); // 400 will come from Error()
});

it('returns an error if the invalid price is provided', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signUp())
    .send({
      title: 'adfdfna',
    })
    .expect(400); // 400 will come from Error()

  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signUp())
    .send({
      title: 'adfdfna',
      price: 0,
    })
    .expect(400); // 400 will come from Error()
});

it('creates a ticket with valid parameters', async () => {
  // we need to add a check if the ticket was saved to mongodb
  let tickets = await Ticket.find({}); // to find all the data -- in an array
  expect(tickets.length).toEqual(0);

  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signUp())
    .send({
      title: 'adfdfna',
      price: 12,
    })
    .expect(201);

  tickets = await Ticket.find({}); // to find all the data -- in an array
  expect(tickets.length).toEqual(1);
  expect(tickets[0].price).toEqual(12);
});

it('publishes an event!', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signUp())
    .send({
      title: 'adfdfna',
      price: 12,
    })
    .expect(201);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
  //? we imported real natsWrapper but jest will replace it with mock one
});
