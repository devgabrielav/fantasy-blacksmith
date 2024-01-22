import { Request, Response } from 'express';
import ordersService from '../services/orders.service';

const getAll = async (_req: Request, res: Response) => {
  const { status, data } = await ordersService.getAllOrders();

  return res.status(status).json(data);
};

const addOrder = async (req: Request, res: Response) => {
  const { productIds, userId } = req.body;

  const { status, data } = await ordersService.addNewOrder({ productIds, userId });

  res.status(status).json(data);
};

export default {
  getAll,
  addOrder,
};