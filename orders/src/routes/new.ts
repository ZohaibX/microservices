import {
  NotFoundError,
  requireAuth,
  OrderStatus,
  BadRequestException,
} from '@zbtickets/common';
import express, { Request, Response } from 'express';
import { Order } from '../model/orders';
import { Ticket } from '../model/ticket';
const router = express.Router();

router.post('/api/orders', requireAuth, async (req: Request, res: Response) => {
  if (!req.body.ticketId || req.body.ticketId === '')
    throw new Error('Ticket ID must be provided');

  //* Find the ticket user is trying to order
  const ticket = await Ticket.findById(req.body.ticketId);
  if (!ticket) throw new NotFoundError();

  //* Making Sure Ticket is not already reserved
  // if the ticket is reserved, it will be associated to some order
  const isReserved = await ticket.isReserved();
  if (isReserved) throw new BadRequestException('Ticket is already reserved');

  //* Calculate an expiration date for this order
  const EXPIRATION_WINDOW_TIME = 15 * 60; // 15 minutes //? this must be done in env variable
  const expiration = new Date();
  expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_TIME);
  // this is how we can set 15 minutes after creating an order

  //* Build the order and save it to the database
  const order = await Order.build({
    userId: req.currentUser!.id,
    ticket: ticket,
    expiresAt: expiration,
    status: OrderStatus.Created,
  });
  await order.save();
  //* Publish an event saying an order is created
  res.status(201).send(order);
});

export { router as createOrder };
