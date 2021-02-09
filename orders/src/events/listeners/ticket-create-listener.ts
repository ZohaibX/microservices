import { Message } from 'node-nats-streaming';
import { Subjects, Listener, TicketCreateEvent } from '@zbtickets/common';
import { OrdersService } from './queue-group-names/orders-service';
import { Ticket } from '../../model/ticket';

export class TicketCreateListener extends Listener<TicketCreateEvent> {
  readonly subject = Subjects.TicketCreated;
  queueGroup = OrdersService;
  // queue group property ensures that if we are running 2 copies of this service,
  // data will go to only one of them

  async onMessage(data: TicketCreateEvent['data'], msg: Message) {
    const { id, title, price } = data; // we are only receiving data, we need to save on our database
    console.log('Im here on this file ');

    const ticket = Ticket.build({
      id,
      title,
      price,
    });

    try {
      await ticket.save();

      msg.ack();
    } catch (error) {
      throw new Error(
        'Unable to save a ticket coming from Tickets Service -- TicketCreateListener'
      );
    }
  }
}
