//! That's how we will create publisher

import { Publisher, Subjects, TicketCreatedInterface } from '@zbtickets/common';

export class TicketCreatePublisher extends Publisher<TicketCreatedInterface> {
  readonly subject = Subjects.TicketCreated;
}

// we will create instance of this class and run publish method
