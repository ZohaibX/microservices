import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { Ticket } from '../../model/ticket';
import { Order } from '../../model/orders';
import { OrderStatus } from '@zbtickets/common';

const buildTicket = async (title: string) => {
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title,
    price: 20,
  });
  await ticket.save();
  return ticket;
};

it('fetches orders for a specific user', async () => {
  //* Create 3 Tickets
  const ticket1 = await buildTicket('Ticket - 1');
  const ticket2 = await buildTicket('Ticket - 2');
  const ticket3 = await buildTicket('Ticket - 3');

  //* Create 2 Users
  const user1 = global.signUp();
  const user2 = global.signUp();

  //* Create One Order as USER 1
  await request(app)
    .post('/api/orders')
    .set('Cookie', user1)
    .send({
      ticketId: ticket1.id,
    })
    .expect(201);

  //* Create Two Orders as USER 2
  await request(app)
    .post('/api/orders')
    .set('Cookie', user2)
    .send({
      ticketId: ticket2.id,
    })
    .expect(201);

  const orderByUser3 = await request(app)
    .post('/api/orders')
    .set('Cookie', user2)
    .send({
      ticketId: ticket3.id,
    })
    .expect(201);

  //* Make request to get orders for USER 2
  const fetchedDataByUser2 = await request(app)
    .get('/api/orders')
    .set('Cookie', user2)
    .send({});

  // Make sure we only got orders of USER 2
  expect(fetchedDataByUser2.body.length).toEqual(2);
});
