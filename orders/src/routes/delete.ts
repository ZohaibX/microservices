import {
  requireAuth,
  NotFoundError,
  NotAuthorizedError,
  OrderStatus,
} from '@zbtickets/common';
import express, { Request, Response } from 'express';
import { Order } from '../model/orders';
// import { Ticket } from '../model/ticket';
const router = express.Router();

router.delete('/api/orders/:id', async (req: Request, res: Response) => {
  //! We will not delete the order but update the status to Cancelled
  if (!req.params.id) throw new Error('Order ID is not provided');

  const order = await Order.findById(req.params.id).populate('ticket');
  if (!order) throw new NotFoundError();

  if (order.userId !== req.currentUser!.id) throw new NotAuthorizedError();

  order.status = OrderStatus.Cancelled;
  await order.save();

  //* Publish an event cancelling the order

  res.status(204).send(order); /// 204 is a delete status
});

export { router as deleteOrder };
