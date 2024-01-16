import { ProductSequelizeModel } from '../database/models/product.model';
import { Product } from './Product';

export type ResponseType = {
  status: number,
  data: Product,
};

export type ResponseArrayType = {
  status: number,
  data: ProductSequelizeModel[],
};