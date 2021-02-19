import { Message } from 'node-nats-streaming';
import {
  Subjects,
  Listener,
  PaymentCreatedEvent,
  NotFoundError,
  OrderStatus,
} from '@zbtickets/common';
import { OrdersService } from './queue-group-names/orders-service';
import { Ticket } from '../../model/ticket';
import { Order } from '../../model/orders';

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;

  queueGroup = OrdersService;

  async onMessage(data: PaymentCreatedEvent['data'], msg: Message) {
    const order = await Order.findById(data.orderId);
    if (!order) throw new NotFoundError();

    await order.set({ status: OrderStatus.Completed }).save();

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // important -- we must publish an event saying order is updated -- every time when order is updated
    // -- so nats will have the latest record with latest version number

    msg.ack();
  }
}
