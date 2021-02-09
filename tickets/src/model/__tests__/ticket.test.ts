import { Ticket } from '../ticket';

it('Implements Optimistic concurrency control -- versioning', async () => {
  // create an instance of a ticket and save it to db
  const ticket = await Ticket.build({
    title: 'concert',
    price: 5,
    userId: '123',
  }).save();

  // fetch the ticket 2 times -- in 2 vars
  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);

  // make 2 separate changes on the both saved tickets
  firstInstance!.set({ price: 15 });
  secondInstance!.set({ price: 25 });

  // save the first fetched ticket -- so its version will be updated, and 2nd fetched ticket's version will be outdated
  await firstInstance!.save();

  // save the 2nd fetched ticked -- its version will be outdated, so expect an error

  try {
    await secondInstance!.save();
  } catch (error) {
    return; //? error will obviously occur , so it will be returned from here
  }

  // is this test ever passes , then it means something is wrong in it -- so will throw an error
  throw new Error('Should not reach this point');

  // May be we could do this
  // expect(async () => {
  //   await secondInstance!.save();
  // }).toThrow();
});

it('increments the version number on multiple saves', async () => {
  const ticket = Ticket.build({
    title: 'concert',
    price: 5,
    userId: '123',
  });

  await ticket!.save();
  expect(ticket.version).toEqual(0); //? by default
  await ticket!.save();
  expect(ticket.version).toEqual(1);
  await ticket!.save();
  expect(ticket.version).toEqual(2);
});
