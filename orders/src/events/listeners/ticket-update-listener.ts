import { Message } from 'node-nats-streaming';
import {
  Subjects,
  Listener,
  NotFoundError,
  TicketUpdateEvent,
} from '@zbtickets/common';
import { OrdersService } from './queue-group-names/orders-service';
import { Ticket } from '../../model/ticket';

export class TicketUpdateListener extends Listener<TicketUpdateEvent> {
  readonly subject = Subjects.TicketUpdated;
  queueGroup = OrdersService;
  // queue group property ensures that if we are running 2 copies of this service,
  // data will go to only one of them

  async onMessage(data: TicketUpdateEvent['data'], msg: Message) {
    const { id, version, title, price } = data; // we are only receiving data, we need to save on our database

    console.log('version: ', version);

    const ticket = await Ticket.findByEvent(data); // we are finding data with the version - 1
    // and when we save the date, mongooseCurrentUpdate plugin will automatically update to +1

    if (!ticket) throw new NotFoundError();

    ticket.set({ title, price });

    try {
      await ticket.save();

      msg.ack();
    } catch (error) {
      throw new Error(
        'Unable to Update a ticket coming from Tickets Service -- TicketUpdateListener'
      );
    }
  }
}
