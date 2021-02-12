import { TicketCreateListener } from '../ticket-create-listener';
import { natsWrapper } from '../../../services/nats/nats-wrapper';
import { Subjects, Listener, TicketCreateEvent } from '@zbtickets/common';
import mongoose from 'mongoose';
import { Ticket } from '../../../model/ticket';
import { Message } from 'node-nats-streaming';

const setup = async () => {
  // create an instance of a listener
  const listener = new TicketCreateListener(natsWrapper.client);

  // create a fake data event
  const data: TicketCreateEvent['data'] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    title: 'concert',
    price: 12,
    userId: new mongoose.Types.ObjectId().toHexString(),
  };

  // create a fake msg object
  // @ts-ignore
  //? ts-ignore is a special keyword in a comment -- to make TS happy
  const msg: Message = {
    ack: jest.fn(),
  };

  return { data, msg, listener };
};

it('creates and saves a ticket', async () => {
  const { data, msg, listener } = await setup();

  // call the onMessage function with the data object + msg object
  await listener.onMessage(data, msg);

  // write assertions to make sure the ticket was created
  const ticket = await Ticket.findById(data.id);
  expect(ticket).toBeDefined();
});

it('creates and saves a ticket', async () => {
  const { data, msg, listener } = await setup();

  // call the onMessage function with the data object + msg object
  await listener.onMessage(data, msg);

  // write assertions to make sure ack function was called
  expect(msg.ack).toHaveBeenCalled();
});
