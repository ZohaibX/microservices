import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { Order } from '../../model/order';
import { OrderStatus } from '@zbtickets/common';

it('should not find an order - return 404', async () => {
  return request(app)
    .post('/api/payments')
    .set('Cookie', global.signUp())
    .send({
      orderId: new mongoose.Types.ObjectId().toHexString(),
      token: 'judshnd',
    })
    .expect(404);
});

it(' should not authorize the order -- 401', async () => {
  const order = await Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    userId: global.signUp()[0],
    price: 20,
    status: OrderStatus.Created,
  }).save();

  await request(app)
    .post('/api/payments')
    .set('Cookie', global.signUp())
    .send({ token: 'jkdsfn', orderId: order.id })
    .expect(401);
});

it('should return 400 if the order is already cancelled', async () => {
  const order = await Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    userId: global.signUp()[0],
    price: 20,
    status: OrderStatus.Cancelled,
  }).save();

  await request(app)
    .post('/api/payments')
    .set('Cookie', global.signUp(order.userId)) // this is how we match the ID
    .send({ token: 'jkdsfn', orderId: order.id })
    .expect(400);
});
