import { Listener, Subjects, OrderCreatedEvent } from '@zbtickets/common';
import { queueGroup } from './queue-group/queue-group';
import { Message } from 'node-nats-streaming';
import { Order } from '../../model/order';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderIsCreated;
  queueGroup = queueGroup;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    const order = await Order.build({
      id: data.id,
      price: data.ticket.price,
      version: data.version,
      status: data.status,
      userId: data.userId,
    }).save();

    msg.ack();
  }
}
