import {
  requireAuth,
  NotFoundError,
  NotAuthorizedError,
  OrderStatus,
  RequestValidationError,
} from '@zbtickets/common';
import express, { Request, Response } from 'express';
import { Order } from '../model/orders';
import { natsWrapper } from '../services/nats/nats-wrapper';
import { OrderCancelPublisher } from '../events/publishers/order-cancel-event';
const router = express.Router();

router.delete('/api/orders/:id', async (req: Request, res: Response) => {
  //! We will not delete the order but update the status to Cancelled
  if (!req.params.id)
    throw new RequestValidationError('Order ID is not provided');

  const order = await Order.findById(req.params.id).populate('ticket');
  if (!order) throw new NotFoundError();

  if (order.userId !== req.currentUser!.id) throw new NotAuthorizedError();

  order.status = OrderStatus.Cancelled;
  await order.save();

  //* Publish an event cancelling the order
  new OrderCancelPublisher(natsWrapper.client).publish({
    id: order.id,
    version: order.version,
    ticket: {
      id: order.ticket.id,
    },
  });

  res.status(204).send(order); /// 204 is a delete status
});

export { router as deleteOrder };
