import {
  Listener,
  OrderCreatedEvent,
  Subjects,
  NotFoundError,
} from '@zbtickets/common';
import { Message } from 'node-nats-streaming';
import { queueGroup } from './queue-group/name';
import { Ticket } from '../../model/ticket';
import { TicketUpdatePublisher } from '../publishers/ticket-update';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderIsCreated;
  queueGroup = queueGroup;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    const ticket = await Ticket.findById(data.ticket.id);
    if (!ticket) throw new NotFoundError();

    ticket.set({ orderId: data.id });
    await ticket.save();

    await new TicketUpdatePublisher(this.client).publish({
      id: ticket.id,
      price: ticket.price,
      title: ticket.title,
      userId: ticket.userId,
      orderId: ticket.orderId,
      version: ticket.version,
    });

    msg.ack();
  }
}
