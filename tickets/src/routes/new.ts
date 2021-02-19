import { requireAuth, RequestValidationError } from '@zbtickets/common';
import express, { Request, Response } from 'express';
import { Ticket } from '../model/ticket';
import { validateAuthInput } from '../services/validate-input';
import { TicketCreatePublisher } from '../events/publishers/ticket-create';
import { natsWrapper } from './../services/nats/nats-wrapper';

const router = express.Router();

router.post(
  '/api/tickets',
  requireAuth,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;

    const error = validateAuthInput({ title, price });
    if (error) throw new RequestValidationError(error);

    const ticket = Ticket.build({
      title,
      price,
      userId: req.currentUser!.id, // we use exclamation mark when we are sure that we already have its check for ts
      // in this case, check is in requireAuth middleware
    });

    await ticket.save();

    await new TicketCreatePublisher(natsWrapper.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      version: ticket.version,
    });

    res.status(201).send(ticket); // 201 is status for -- created
  }
);

export { router as createTicketRoute };
