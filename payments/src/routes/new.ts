import express, { Request, Response } from 'express';
import {
  requireAuth,
  BadRequestException,
  NotAuthorizedError,
  NotFoundError,
  OrderStatus,
} from '@zbtickets/common';
import { validateInput } from '../services/validate-input';
import { Order } from '../model/order';
import { stripe } from '../services/stripe';

const router = express.Router();

router.post(
  '/api/payments',
  requireAuth,
  async (req: Request, res: Response) => {
    const error = validateInput(req.body);
    if (error) throw new Error(error);

    const { orderId, token } = req.body;

    // Find order for the payment
    const order = await Order.findById(orderId);
    if (!order) throw new NotFoundError();

    // see if payment guy and the guy who created the order are same or not
    if (order.userId !== req.currentUser!.id) throw new NotAuthorizedError();

    // see, if the created order is not already cancelled by the creator or by expiration service
    if (order.status === OrderStatus.Cancelled)
      throw new BadRequestException('Order is already cancelled');

    //! for testing in postman - fake token is "tok_visa"
    //! for chrome -- it is something like 4242 4242 4242 4242 and more
    await stripe.charges.create({
      currency: 'usd',
      amount: order.price * 100,
      source: token,
    });

    res.send({ success: true });
  }
);

export { router as CreateChargeRouter };
