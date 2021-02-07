import { Publisher } from './base-publisher';
import { Subjects } from './subjects';
import { TicketCreatedInterface } from './ticket-listener-interface';

export class TicketCreatedPublisher extends Publisher<TicketCreatedInterface> {
  readonly subject = Subjects.TicketCreated;
}
