import { Ticket } from '../../../model/ticket';
import { OrderCreatedListener } from '../order-created';
import { natsWrapper } from './../../../services/nats/nats-wrapper';
import { OrderCreatedEvent, OrderStatus } from '@zbtickets/common';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';

const setup = async () => {
  const listener = new OrderCreatedListener(natsWrapper.client);

  const ticket = await Ticket.build({
    title: 'concert',
    price: 12,
    userId: 'jadnjksdda',
  }).save();

  const fakeData: OrderCreatedEvent['data'] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    status: OrderStatus.Created,
    userId: 'adkjnds',
    version: 0,
    expiresAt: 'sjksdbnkja',
    ticket: {
      id: ticket.id,
      price: ticket.price,
    },
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { ticket, fakeData, listener, msg };
};

it('sets the userId of the ticket', async () => {
  const { ticket, fakeData, listener, msg } = await setup();

  await listener.onMessage(fakeData, msg);

  const updatedTicket = await Ticket.findById(ticket.id);

  expect(updatedTicket!.orderId).toEqual(fakeData.id);
});

it('publishes a ticket update event', async () => {
  const { ticket, fakeData, listener, msg } = await setup();

  await listener.onMessage(fakeData, msg);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
