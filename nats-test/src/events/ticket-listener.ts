import { Message } from 'node-nats-streaming';
import { Listener } from './base-listener';
import { TicketCreatedInterface } from './ticket-listener-interface';
import { Subjects } from './subjects';

export class TicketCreatedListener extends Listener<TicketCreatedInterface> {
  readonly subject = Subjects.TicketCreated; // we have to provide readonly so it cannot be changed except from this line
  queueGroup = 'payments-service'; // because payment service will get the msg that the ticket is created

  onMessage(data: TicketCreatedInterface['data'], msg: Message) {
    console.log('Event Occured: ', data);

    msg.ack();
  }
}
