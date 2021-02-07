import { NotFoundError } from '@zbtickets/common';
import express, { Request, Response } from 'express';
// import { Ticket } from '../model/ticket';
const router = express.Router();

router.get('/api/orders', async (req: Request, res: Response) => {
  res.send({});
});

export { router as showAllOrders };
