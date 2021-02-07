import { showOneOrder } from './show';
import { deleteOrder } from './delete';
import { showAllOrders } from './index';
import { createOrder } from './new';

export default (app: any) => {
  // routes
  app.use(showOneOrder);
  app.use(createOrder);
  app.use(deleteOrder);
  app.use(showAllOrders);
};
