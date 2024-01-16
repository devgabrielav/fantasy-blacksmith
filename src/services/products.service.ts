import ProductModel, { ProductInputtableTypes } from '../database/models/product.model';
import { ResponseArrayType, ResponseType } from '../types/Response';

const addNewProduct = async (
  { name, price, orderId }: ProductInputtableTypes,
): Promise<ResponseType> => {
  const newProduct = await ProductModel.create({ name, price, orderId });

  return { status: 201, data: newProduct.dataValues };
};

const getAllProducts = async (): Promise<ResponseArrayType> => {
  const products = await ProductModel.findAll();

  return { status: 200, data: products };
};

export default {
  addNewProduct,
  getAllProducts,
};