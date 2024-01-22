import OrderModel from '../database/models/order.model';
import ProductModel from '../database/models/product.model';
import { NewOrder, OrderIds, OrderSequelizeReturn } from '../types/Order';
import { Product } from '../types/Product';
import { ResponseArrayType, ResponseType } from '../types/Response';

const returnNumbersArray = (array: number[] | Product[]): number[] => {
  const mappedArray = array.map((item: number | Product) => 
    (typeof item === 'object' ? item.id : item));

  return mappedArray;
};

const getAllOrders = async (): Promise<ResponseArrayType<OrderIds>> => {
  const orders: OrderSequelizeReturn<Product>[] = await OrderModel.findAll({
    include: [
      { model: ProductModel, 
        as: 'productIds',
        attributes: ['id'] },
    ],
  });
  
  const data = orders.map((order) => {
    const { id, userId } = order.dataValues;
    return { id,
      userId,
      productIds: order.dataValues
        .productIds ? returnNumbersArray(order.dataValues.productIds) : [] };
  });

  return { status: 200, data };
};

const addNewOrder = async (order: NewOrder): Promise<ResponseType<NewOrder>> => {
  const addedOrder = await OrderModel
    .create({ userId: order.userId, productIds: order.productIds });
  
  await ProductModel
    .update({ orderId: addedOrder.dataValues.id }, { where: { id: order.productIds } });

  return { status: 201, data: order };
};

export default {
  getAllOrders,
  addNewOrder,
};