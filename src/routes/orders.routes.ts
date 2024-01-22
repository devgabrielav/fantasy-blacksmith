import { Router } from 'express';
import ordersController from '../controllers/orders.controller';
import middleware from '../middlewares/auth.middleware';
import orderMiddleware from '../middlewares/order.middleware';

const ordersRoutes = Router();

ordersRoutes.get('/', ordersController.getAll);

ordersRoutes.post(
  '/', 
  middleware.authMiddleware,
  orderMiddleware.userIdMiddleware,
  orderMiddleware.productsIdsMiddleware,
  ordersController.addOrder,
);

export default ordersRoutes;