//! That's how we will create publisher

import { Publisher, Subjects, TicketUpdatedInterface } from '@zbtickets/common';

export class TicketUpdatePublisher extends Publisher<TicketUpdatedInterface> {
  readonly subject = Subjects.TicketUpdated;
}

// we will create instance of this class and run publish method
