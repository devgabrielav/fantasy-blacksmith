import { Product } from './Product';

export type Order = {
  id: number;
  userId: number;
  productIds?: Product[];
};

export type OrderIds = {
  id: number,
  userId: number,
  productIds?: number[],
};

export type OrderSequelizeReturn = {
  dataValues: {
    id: number;
    userId: number;
    productIds?: Product[];
  }
};