import { createTicketRoute } from './new';
import { showOne } from './show-one';
import { showAll } from './showAll';
import { updateTicketRoute } from './update';

export default (app: any) => {
  // routes
  app.use(createTicketRoute);
  app.use(showOne);
  app.use(showAll);
  app.use(updateTicketRoute);
};
