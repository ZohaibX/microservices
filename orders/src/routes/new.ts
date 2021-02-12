import {
  NotFoundError,
  requireAuth,
  OrderStatus,
  BadRequestException,
} from '@zbtickets/common';
import express, { Request, Response } from 'express';
import { Order } from '../model/orders';
import { Ticket } from '../model/ticket';
import { natsWrapper } from '../services/nats/nats-wrapper';
import { OrderCreatePublisher } from '../events/publishers/order-create-event';
const router = express.Router();

router.post('/api/orders', requireAuth, async (req: Request, res: Response) => {
  if (!req.body.ticketId || req.body.ticketId === '')
    throw new Error('Ticket ID must be provided');

  //* Find the ticket user is trying to order
  const ticket = await Ticket.findById(req.body.ticketId);
  console.log(ticket);

  if (!ticket) throw new NotFoundError();

  //* Making Sure Ticket is not already reserved
  // if the ticket is reserved, it will be associated to some order
  const isReserved = await ticket.isReserved();
  if (isReserved) throw new BadRequestException('Ticket is already reserved');

  //* Calculate an expiration date for this order
  const EXPIRATION_WINDOW_TIME = 15 * 60; // 15 minutes //? this must be done in env variable
  const expiration = new Date();
  expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_TIME);
  //? this will set the time into some long number
  //? new Date(expiration).getTime() // saved time in ms  - new Date().getTime() // current time in ms
  //? this is how we can get back our Expiration time in seconds
  // note - this is how we can set 15 minutes after creating an order

  //* Build the order and save it to the database
  const order = await Order.build({
    userId: req.currentUser!.id,
    ticket: ticket,
    expiresAt: expiration,
    status: OrderStatus.Created,
  });
  await order.save();

  //* Publish an event saying an order is created
  new OrderCreatePublisher(natsWrapper.client).publish({
    id: order.id,
    status: order.status,
    userId: order.userId,
    version: order.version,
    expiresAt: order.expiresAt.toISOString(), // we will send data as string and retrieve as object
    ticket: {
      id: ticket.id,
      price: ticket.price,
    },
  });

  res.status(201).send(order);
});

export { router as createOrder };
