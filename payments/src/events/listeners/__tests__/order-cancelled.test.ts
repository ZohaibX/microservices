import { Order } from '../../../model/order';
import { natsWrapper } from '../../../services/nats/nats-wrapper';
import { OrderCancelledEvent, OrderStatus } from '@zbtickets/common';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { OrderCancelledListener } from '../order-cancelled';

const setup = async () => {
  const listener = new OrderCancelledListener(natsWrapper.client);

  const order = await Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    userId: 'ssjdnd',
    price: 12,
    status: OrderStatus.Created,
  }).save();

  const data: OrderCancelledEvent['data'] = {
    id: order.id,
    version: 1, // when the order cancellation will occur in the order service, its version will be incremented by one
    ticket: {
      id: new mongoose.Types.ObjectId().toHexString(),
    },
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { msg, data, listener, order };
};

it('updates the status of order ', async () => {
  const { msg, data, listener, order } = await setup();

  await listener.onMessage(data, msg);

  const updatedOrder = await Order.findById(data.id);
  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});
