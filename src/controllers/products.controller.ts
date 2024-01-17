import { RequestHandler } from 'express';
import productsService from '../services/products.service';

const addProduct: RequestHandler = async (req, res) => {
  const { name, price, orderId } = req.body;

  const { status, data } = await productsService.addNewProduct({ name, price, orderId });

  return res.status(status).json(data);
};

const getAll: RequestHandler = async (_req, res) => {
  const { status, data } = await productsService.getAllProducts();

  return res.status(status).json(data);
};

export default {
  addProduct,
  getAll,
};