import { natsWrapper } from './nats-wrapper';
import { TicketCreateListener } from '../../events/listeners/ticket-create-listener';
import { TicketUpdateListener } from '../../events/listeners/ticket-update-listener';

export const natsConnection = async () => {
  if (!process.env.NATS_CLUSTER_ID)
    throw new Error('NATS CLUSTER_ID is not defined');

  if (!process.env.NATS_CLIENT_ID)
    throw new Error('NATS CLIENT_ID is not defined');

  if (!process.env.NATS_URL) throw new Error('NATS URL is not defined');
  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID, // client id is always unique, client id is its own pod name, which is always unique
      process.env.NATS_URL
    );
    // it already has a console.log of NATS connection in natsWrapper
    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed');
      process.exit();
    });

    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

    //! these are the listeners , will be different in every file
  } catch (error) {
    console.error(error);
  }
};
