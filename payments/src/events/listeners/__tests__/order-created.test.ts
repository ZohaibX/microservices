import { Order } from '../../../model/order';
import { OrderCreatedListener } from '../order-created';
import { natsWrapper } from '../../../services/nats/nats-wrapper';
import { OrderCreatedEvent, OrderStatus } from '@zbtickets/common';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';

const setup = async () => {
  const listener = new OrderCreatedListener(natsWrapper.client);

  const data: OrderCreatedEvent['data'] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    status: OrderStatus.Created,
    userId: 'bsnkjsfdnfds',
    expiresAt: 'jshsfjdk',
    ticket: {
      id: 'jfnksdfn',
      price: 12,
    },
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { msg, data, listener };
};

it('saves the order info ', async () => {
  const { msg, data, listener } = await setup();

  await listener.onMessage(data, msg);

  const savedOrder = await Order.findById(data.id);
  expect(savedOrder!.id).toEqual(data.id);
});
