import { NotFoundError, requireAuth } from '@zbtickets/common';
import express, { Request, Response } from 'express';
import { Ticket } from '../model/ticket';
const router = express.Router();

router.get('/api/tickets', requireAuth, async (req: Request, res: Response) => {
  const tickets = await Ticket.find({});
  // console.log('I am at the route and i got tickets: ', tickets);

  if (!tickets) throw new NotFoundError();

  res.send(tickets);
});

export { router as showAll };
