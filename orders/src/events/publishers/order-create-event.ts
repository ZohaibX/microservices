import { OrderCreatedEvent, Publisher, Subjects } from '@zbtickets/common';

export class OrderCreatePublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderIsCreated;
}
