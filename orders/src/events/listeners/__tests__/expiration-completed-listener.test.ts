import { Ticket } from '../../../model/ticket';
import { ExpirationCompletedListener } from '../expiration-completed';
import { natsWrapper } from './../../../services/nats/nats-wrapper';
import mongoose from 'mongoose';
import { Order } from '../../../model/orders';
import { OrderStatus, ExpirationCompleted, Subjects } from '@zbtickets/common';
import { Message } from 'node-nats-streaming';

const setup = async () => {
  const listener = new ExpirationCompletedListener(natsWrapper.client);

  const ticket = await Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'concert',
    price: 12,
  }).save();

  const order = await Order.build({
    userId: new mongoose.Types.ObjectId().toHexString(),
    expiresAt: new Date(),
    status: OrderStatus.Created,
    ticket,
  }).save();

  const data: ExpirationCompleted['data'] = {
    orderId: order.id,
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { order, ticket, listener, msg, data };
};

it('updates the order status to cancelled', async () => {
  const { msg, ticket, data, listener, order } = await setup();

  await listener.onMessage(data, msg);

  const updatedOrder = await Order.findById(data.orderId);
  expect(updatedOrder?.status).toEqual(OrderStatus.Cancelled);
});

it('emits an order cancelled event', async () => {
  const { msg, ticket, data, listener, order } = await setup();

  await listener.onMessage(data, msg);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
