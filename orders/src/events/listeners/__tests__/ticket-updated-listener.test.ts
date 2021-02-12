import { natsWrapper } from '../../../services/nats/nats-wrapper';
import { Subjects, Listener, TicketUpdateEvent } from '@zbtickets/common';
import mongoose from 'mongoose';
import { Ticket } from '../../../model/ticket';
import { Message } from 'node-nats-streaming';
import { TicketUpdateListener } from './../ticket-update-listener';

const setup = async () => {
  // create a listener
  const listener = new TicketUpdateListener(natsWrapper.client);

  // create and save a ticket
  const ticket = await Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'concert',
    price: 12,
  }).save();

  // create a fake data object
  const data: TicketUpdateEvent['data'] = {
    id: ticket.id,
    version: ticket.version + 1,
    title: 'concert-new',
    price: 125,
    userId: new mongoose.Types.ObjectId().toHexString(),
  };

  // create a fake msg object
  // @ts-ignore
  //? ts-ignore is a special keyword in a comment -- to make TS happy
  const msg: Message = {
    ack: jest.fn(),
  };
  // return all of this
  return { msg, ticket, data, listener };
};

it('finds, updates and saves a ticket', async () => {
  const { msg, ticket, data, listener } = await setup();

  await listener.onMessage(data, msg);

  const updatedTicket = await Ticket.findById(ticket.id);

  expect(updatedTicket!.title).toEqual(data.title);
});

it('acks the msg', async () => {
  const { msg, ticket, data, listener } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});

it('does not call the ack function if the the version number has skipped some numbers', async () => {
  const { msg, ticket, data, listener } = await setup();

  data.version = 10;

  try {
    await listener.onMessage(data, msg);
  } catch (error) {}
  expect(msg.ack).not.toHaveBeenCalled();
});
