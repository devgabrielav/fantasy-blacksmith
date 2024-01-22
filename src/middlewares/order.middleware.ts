import { RequestHandler } from 'express';
import UserModel from '../database/models/user.model';

const userIdMiddleware: RequestHandler = async (req, res, next) => {
  const { userId } = req.body;

  if (!userId) return res.status(400).json({ message: '"userId" is required' });

  if (typeof userId !== 'number') {
    return res.status(422).json({ message: '"userId" must be a number' });
  }

  const validUser = await UserModel.findOne({ where: { id: userId } });

  if (!validUser) return res.status(404).json({ message: '"userId" not found' });

  next();
};

const productsIdsMiddleware: RequestHandler = async (req, res, next) => {
  const { productIds } = req.body;

  if (!productIds) return res.status(400).json({ message: '"productIds" is required' });

  if (!Array.isArray(productIds)) {
    return res.status(422).json({ message: '"productIds" must be an array' });
  }

  const allNumbers = productIds.every((id) => typeof id === 'number');

  if (!allNumbers || productIds.length === 0) {
    return res.status(422).json({ message: '"productIds" must include only numbers' });
  }

  next();
};

export default {
  userIdMiddleware,
  productsIdsMiddleware,
};