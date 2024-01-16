import ProductModel, { ProductInputtableTypes } from '../database/models/product.model';
import { Product } from '../types/Product';

type ResponseType = {
  status: number,
  data: Product,
};

const addNewProduct = async (
  { name, price, orderId }: ProductInputtableTypes,
): Promise<ResponseType> => {
  const newProduct = await ProductModel.create({ name, price, orderId });

  return { status: 201, data: newProduct.dataValues };
};

export default {
  addNewProduct,
};