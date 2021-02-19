import express, { Request, Response } from 'express';
import {
  requireAuth,
  NotFoundError,
  NotAuthorizedError,
  RequestValidationError,
  BadRequestException,
} from '@zbtickets/common';
import { validateAuthInput } from '../services/validate-input';
import { Ticket } from '../model/ticket';
import { TicketUpdatePublisher } from '../events/publishers/ticket-update';
import { natsWrapper } from '../services/nats/nats-wrapper';
const router = express.Router();

router.put(
  '/api/tickets/:id',
  requireAuth,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;

    const error = validateAuthInput({ title, price });
    if (error) throw new RequestValidationError(error);

    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) throw new NotFoundError();

    if (ticket.orderId)
      throw new BadRequestException(' Cannot Edit a Reserved Ticket');
    if (ticket.userId !== req.currentUser!.id) throw new NotAuthorizedError();

    // way to update
    ticket.set({ title, price });
    await ticket.save();

    await new TicketUpdatePublisher(natsWrapper.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      version: ticket.version,
    });

    res.send(ticket);
  }
);

export { router as updateTicketRoute };
