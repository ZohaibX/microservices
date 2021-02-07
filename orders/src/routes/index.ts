import { requireAuth } from '@zbtickets/common';
import express, { Request, Response } from 'express';
import { Order } from '../model/orders';
// import { Ticket } from '../model/ticket';
const router = express.Router();

router.get('/api/orders', requireAuth, async (req: Request, res: Response) => {
  const orders = await Order.find({
    userId: req.currentUser!.id,
  }).populate('ticket');
  res.send(orders);
});

export { router as showAllOrders };
