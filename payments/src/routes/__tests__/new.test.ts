import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { Order } from '../../model/order';
import { OrderStatus } from '@zbtickets/common';
import { stripe } from '../../services/stripe';
import { Payment } from '../../model/payment';

//?? importing original instances
jest.mock('../../services/stripe'); // this will mock the imported stripe

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

it('makes payment -- returns 204 with valid input', async () => {
  const userId = mongoose.Types.ObjectId().toHexString();
  const order = await Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    userId,
    price: 20,
    status: OrderStatus.Created,
  }).save();

  await request(app)
    .post('/api/payments')
    .set('Cookie', global.signUp(userId)) // this is how we match the ID
    .send({ token: 'tok_visa', orderId: order.id })
    .expect(201);

  //!!!!! this is how we can test mock method results -- for natsWrapper too
  const chargedResult = (stripe.charges.create as jest.Mock).mock.calls[0][0];
  expect(chargedResult.source).toEqual('tok_visa');
  expect(chargedResult.currency).toEqual('usd');
});

it('saves the charge into the Payment model', async () => {
  const userId = mongoose.Types.ObjectId().toHexString();
  const order = await Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    userId,
    price: 20,
    status: OrderStatus.Created,
  }).save();

  await request(app)
    .post('/api/payments')
    .set('Cookie', global.signUp(userId)) // this is how we match the ID
    .send({ token: 'tok_visa', orderId: order.id })
    .expect(201);

  const payment = await Payment.findOne({ orderId: order.id });
  expect(payment).toBeDefined();
});
