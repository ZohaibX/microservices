import { queueGroup } from './queue-group/queue-group';
import { Message } from 'node-nats-streaming';
import { Order } from '../../model/order';
import {
  Listener,
  Subjects,
  OrderCancelledEvent,
  OrderStatus,
} from '@zbtickets/common';

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  readonly subject = Subjects.OrderIsCancelled;
  queueGroup = queueGroup;

  async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
    const order = await Order.findOne({
      _id: data.id,
      version: data.version - 1,
    });

    if (!order) throw new Error('Order Not Found!');

    await order.set({ status: OrderStatus.Cancelled }).save();

    msg.ack();
  }
}
