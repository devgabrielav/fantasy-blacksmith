import { RequestHandler } from 'express';
import ordersService from '../services/orders.service';

const getAll: RequestHandler = async (_req, res) => {
  const { status, data } = await ordersService.getAllOrders();

  return res.status(status).json(data);
};

export default {
  getAll,
};