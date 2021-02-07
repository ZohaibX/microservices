import nats from 'node-nats-streaming';
import { TicketCreatedPublisher } from './events/ticket-created-publisher';

console.clear();
// to clear the screen before every run

// 2nd argument is not same
const stan = nats.connect('ticketing', 'abc', {
  url: 'https://localhost:4222',
});

stan.on('connect', async () => {
  // it will run when stan is connected
  console.log('Publisher is connected to NATS ');

  const publisher = new TicketCreatedPublisher(stan);
  try {
    await publisher.publish({
      id: '1212',
      title: 'wlsd',
      price: 2,
    });
  } catch (error) {
    console.error(error);
  }
  // const data = JSON.stringify({
  //   id: '123',
  //   name: 'Zohaib Shahid',
  // });

  // // ticket:created is channel where our data will be sent
  // stan.publish('ticket:created', data, () => {
  //   // function will be invoked after data is published
  //   console.log('Data is Published');
  // });
});
