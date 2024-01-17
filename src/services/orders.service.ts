import OrderModel from '../database/models/order.model';
import ProductModel from '../database/models/product.model';
import { OrderIds, OrderSequelizeReturn } from '../types/Order';
import { ResponseArrayType } from '../types/Response';

const getAllOrders = async (): Promise<ResponseArrayType<OrderIds>> => {
  const orders: OrderSequelizeReturn[] = await OrderModel.findAll({
    include: [
      { model: ProductModel, 
        as: 'productIds',
        attributes: ['id'],
      },
    ],
  });

  const data = orders.map((order) => {
    const { id, userId } = order.dataValues;
    return {
      id,
      userId,
      productIds: order.dataValues.productIds ? order.dataValues.productIds
        .map((product) => product.id) : [], 
    };
  });

  return { status: 200, data };
};

export default {
  getAllOrders,
};