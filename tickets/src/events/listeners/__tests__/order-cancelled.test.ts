import { Ticket } from '../../../model/ticket';
import { natsWrapper } from './../../../services/nats/nats-wrapper';
import { OrderCancelledEvent, OrderStatus } from '@zbtickets/common';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { OrderCancelledListener } from '../order-cancelled';

const setup = async () => {
  const listener = new OrderCancelledListener(natsWrapper.client);

  const orderId = new mongoose.Types.ObjectId().toHexString();
  const ticket = Ticket.build({
    title: 'concert',
    price: 12,
    userId: 'jadnjksdda',
  });
  ticket.set({ orderId });
  await ticket.save();

  const fakeData: OrderCancelledEvent['data'] = {
    id: orderId,
    version: 0,
    ticket: {
      id: ticket.id,
    },
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { ticket, fakeData, listener, msg };
};

it('Updates a ticket and publishes update Event ', async () => {
  const { ticket, fakeData, listener, msg } = await setup();

  await listener.onMessage(fakeData, msg);

  const updatedTicket = await Ticket.findById(ticket.id);
  expect(updatedTicket!.orderId).not.toBeDefined();

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
