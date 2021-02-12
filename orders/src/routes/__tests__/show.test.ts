import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { Ticket } from '../../model/ticket';
import { Order } from '../../model/orders';
import { OrderStatus } from '@zbtickets/common';

it('fetches the order', async () => {
  //* create a ticket
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'Ticket',
    price: 12,
  });
  await ticket.save();

  //* create an order for this ticket
  const user = global.signUp();
  const order = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);
  // console.log(order.body);

  //* make request to fetch the ticket
  const fetchOrder = await request(app)
    .get(`/api/orders/${order.body.id}`)
    .set('Cookie', user)
    .send({});
  expect(fetchOrder.body.ticket.title).toEqual('Ticket');
});

it('returns an error if user tries to fetch another users order', async () => {
  //* create a ticket
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'Ticket',
    price: 12,
  });
  await ticket.save();

  //* create an order for this ticket
  const user = global.signUp();
  const order = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);
  console.log(order.body);

  //* make request to fetch the ticket
  const anotherUser = global.signUp();
  await request(app)
    .get(`/api/orders/${order.body.id}`)
    .set('Cookie', anotherUser)
    .send({})
    .expect(401);
});
