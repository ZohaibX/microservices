import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { Ticket } from '../../model/ticket';
import { Order } from '../../model/orders';
import { OrderStatus } from '@zbtickets/common';

it('returns an error if the ticket does not exist ', async () => {
  const ticketId = mongoose.Types.ObjectId();

  await request(app)
    .post('/api/orders')
    .set('Cookie', global.signUp())
    .send({ ticketId })
    .expect(404);
});

it('returns an error if the ticket is already reserved ', async () => {
  //? ticket is reserved if some ticket is associated to the order and with the status of created or payed or awaiting payment

  const ticket = Ticket.build({
    title: 'blah blah',
    price: 12,
  });
  await ticket.save();

  // this way
  // const order = Order.build({
  //   ticket: ticket,
  //   status: OrderStatus.Created,
  //   userId: 'ksdmkdsdsa',
  //   expiresAt: new Date(),
  // });
  // await order.save();

  //* ---- OR ------

  // this way
  await request(app)
    .post('/api/orders')
    .set('Cookie', global.signUp())
    .send({ ticketId: ticket.id })
    .expect(201);

  await request(app)
    .post('/api/orders')
    .set('Cookie', global.signUp())
    .send({ ticketId: ticket.id }) // sending same ticket id which is already reserved
    .expect(400);
});

it('reserved a ticket  ', async () => {
  const ticket = Ticket.build({
    title: 'blah blah',
    price: 12,
  });
  await ticket.save();

  await request(app)
    .post('/api/orders')
    .set('Cookie', global.signUp())
    .send({ ticketId: ticket.id })
    .expect(201);
});

it.todo('publish an event creating order ');
