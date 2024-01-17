import { Router } from 'express';
import productsController from '../controllers/products.controller';
import productsMiddleware from '../middlewares/products.middleware';

const productsRoutes = Router();

productsRoutes.post(
  '/',
  productsMiddleware.nameMiddleware,
  productsMiddleware.priceMiddleware, 
  productsController.addProduct,
);

productsRoutes.get('/', productsController.getAll);

export default productsRoutes;