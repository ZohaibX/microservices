import { Listener, OrderCreatedEvent, Subjects } from '@zbtickets/common';
import { QueueGroup } from './queue-group/queue-group';
import { Message } from 'node-nats-streaming';
import { expirationQueue } from '../../queues/expiration-srv';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderIsCreated;
  queueGroup = QueueGroup;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
    // new Date(data.expiresAt).getTime() will give us saved time in milli-seconds
    // new Date().getTime() will give us current time in milli-seconds
    console.log('!!!!!!!!!!!!!!!! delay time is: ', delay); // it would be in ms -- so delay/1000= seconds

    //? expiresAt property has saved specific timing in new.ts file

    await expirationQueue.add(
      {
        orderId: data.id,
      },
      {
        delay,
      }
    );

    msg.ack();
  }
}
