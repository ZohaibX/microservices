import { OrderCancelledEvent, Publisher, Subjects } from '@zbtickets/common';

export class OrderCancelPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderIsCancelled;
}
