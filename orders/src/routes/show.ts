import {
  requireAuth,
  NotFoundError,
  NotAuthorizedError,
} from '@zbtickets/common';
import express, { Request, Response } from 'express';
import { Order } from '../model/orders';
// import { Ticket } from '../model/ticket';
const router = express.Router();

router.get('/api/orders/:id', async (req: Request, res: Response) => {
  if (!req.params.id) throw new Error('Order ID is not provided');

  const order = await Order.findById(req.params.id).populate('ticket');
  if (!order) throw new NotFoundError();

  if (order.userId !== req.currentUser!.id) throw new NotAuthorizedError();

  res.send(order);
});

export { router as showOneOrder };
