import {
  Listener,
  ExpirationCompleted,
  Subjects,
  OrderStatus,
} from '@zbtickets/common';
import { Message } from 'node-nats-streaming';
import { Order } from '../../model/orders';
import { OrdersService } from './queue-group-names/orders-service';
import { OrderCancelPublisher } from '../publishers/order-cancel-event';
import { natsWrapper } from '../../services/nats/nats-wrapper';

export class ExpirationCompletedListener extends Listener<ExpirationCompleted> {
  readonly subject = Subjects.ExpirationCompleted;
  queueGroup = OrdersService;

  async onMessage(data: ExpirationCompleted['data'], msg: Message) {
    const order = await Order.findById(data.orderId).populate('ticket');
    //????? this is the way we get the 'Ref' data back

    if (!order) throw new Error('Order not found');
    if (order.status === OrderStatus.Completed) return msg.ack(); // if order is already payed -- return from here

    order.set({
      status: OrderStatus.Cancelled,
      // ticket: null,
      //? no need to make ticket=== null , when status is "Cancelled", anyone could reserve  the ticket and we could see the ticket whom order was cancelled.
      //? this is how we could find out order's ticket details that are cancelled
    });
    await order.save();

    new OrderCancelPublisher(natsWrapper.client).publish({
      id: order.id,
      version: order.version,
      ticket: {
        id: order.ticket.id,
      },
    });

    msg.ack();
  }
}
