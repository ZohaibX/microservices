import Queue from 'bull';
import { ExpirationCompletedPublisher } from '../events/publishers/expiration-complete';
import { natsWrapper } from '../services/nats/nats-wrapper';

/*  
 Main theme of this file is -- we want to publish an event that order is expired 
 when the order is created, we will get that through the listener
 then, in this file, with the help of bull. we will publish an event after 15 minutes / any timestamp 
 that will tell to expire the order
*/

//? to expire an order , we just need an order id, from our created listener
interface Payload {
  orderId: string;
}

const expirationQueue = new Queue<Payload>('order:expiration', {
  redis: {
    host: process.env.REDIS_HOST,
  },
});

// this function will process , when the provided delay is completed
//? delay is provided in order created listener
expirationQueue.process(async (job) => {
  // we will simply publish an event of expiration complete, when the order service receives it, it will do its job
  new ExpirationCompletedPublisher(natsWrapper.client).publish({
    orderId: job.data.orderId,
  });
});

export { expirationQueue };
