import { Product } from './Product';

export type Order = {
  id: number;
  userId: number;
  productIds?: number[] | Product[];
};

export type OrderIds = {
  id: number,
  userId: number,
  productIds?: number[],
};

export type OrderSequelizeReturn<T> = {
  dataValues: {
    id: number;
    userId: number;
    productIds?: T[] | number[] | Product[];
  }
};

export type NewOrder = {
  id?: number,
  userId: number,
  productIds: number[],
};