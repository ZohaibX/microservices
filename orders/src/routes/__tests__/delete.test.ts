import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { Ticket } from '../../model/ticket';
import { Order } from '../../model/orders';
import { OrderStatus } from '@zbtickets/common';
import { natsWrapper } from '../../services/nats/nats-wrapper'; //! jest will automatically use mock natsWrapper according to our setting in setup.ts

it('marks an orders status as Cancelled', async () => {
  const user = global.signUp();

  //* create a ticket to create an order
  const ticket = Ticket.build({
    title: 'Ticket',
    price: 12,
  });
  await ticket.save();

  //* create an order
  const order = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);

  //* delete the order with the same userId
  const deletedOrder = await request(app)
    .delete(`/api/orders/${order.body.id}`)
    .set('Cookie', user)
    .send({})
    .expect(204);

  //* see status was changed or not
  //? we can see deleted Order's body directly
  const updatedOrder = await Order.findById(order.body.id);

  // Type check for TS
  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it('publish an event cancelling order', async () => {
  const user = global.signUp();

  //* create a ticket to create an order
  const ticket = Ticket.build({
    title: 'Ticket',
    price: 12,
  });
  await ticket.save();

  //* create an order
  const order = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);

  //* delete the order with the same userId
  const deletedOrder = await request(app)
    .delete(`/api/orders/${order.body.id}`)
    .set('Cookie', user)
    .send({})
    .expect(204);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
