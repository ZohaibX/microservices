import { NotFoundError } from '@zbtickets/common';
import express, { Request, Response } from 'express';
// import { Ticket } from '../model/ticket';
const router = express.Router();

router.delete('/api/orders/:id', async (req: Request, res: Response) => {
  res.send({});
});

export { router as deleteOrder };
