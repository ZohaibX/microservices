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
import { Payment } from '../model/payment';

//? more detailed stripe properties are defined in github.com/ZohaibX/stripe

const router = express.Router();

router.post(
  '/api/payments',
  requireAuth,
  async (req: Request, res: Response) => {
    console.log('111111111111111111111111111');
    // const error = validateInput(req.body);
    // if (error) throw new Error(error);
    // console.log('2222222222222222222222222');

    // // note - token will be provided by the frontend of the stripe
    // const { orderId, token } = req.body;

    // // Find order for the payment
    // const order = await Order.findById(orderId);
    // if (!order) throw new NotFoundError();

    // // see if payment guy and the guy who created the order are same or not
    // if (order.userId !== req.currentUser!.id) throw new NotAuthorizedError();

    // // see, if the created order is not already cancelled by the creator or by expiration service
    // if (order.status === OrderStatus.Cancelled)
    //   throw new BadRequestException('Order is already cancelled');

    // //! for testing in postman - fake token is "tok_visa"
    // //! for chrome -- it is something like 4242 4242 4242 4242 and more
    // let charge = await stripe.charges.create({
    //   currency: 'usd',
    //   amount: order.price * 100,
    //   source: token,
    // });

    // //? charge will be having id and some other properties, from id, we could easily find out details of the charge
    // const payment = await Payment.build({
    //   orderId,
    //   stripeId: charge.id,
    // }).save();

    res.status(201).send({ success: true }); // 201 for creating payment
  }
);

export { router as CreateChargeRouter };
