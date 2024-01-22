import { expect } from 'chai';
import sinon from 'sinon';
import orderService from '../../../src/services/orders.service';
import orderMocks from '../../mocks/orders.mocks';
import OrderModel from '../../../src/database/models/order.model';
import productsMock from '../../mocks/products.mock';
import ProductModel from '../../../src/database/models/product.model';

describe('OrdersService', function () {
  beforeEach(function () { sinon.restore(); });

  it('Busca todos os pedidos com sucesso', async function () {
    const mockOrderReturn = OrderModel.bulkBuild(orderMocks.ordersMock, { include: [
      { model: ProductModel, 
        as: 'productIds',
        attributes: ['id'] },
    ] });
    sinon.stub(OrderModel, 'findAll').resolves(mockOrderReturn);

    const serviceResponse = await orderService.getAllOrders();

    expect(serviceResponse.status).to.equal(200);
    expect(serviceResponse.data).to.eql(orderMocks.ordersMockServiceReturn);
  });
  
  it('Adiciona um pedido com sucesso', async function () {
    const parameters = orderMocks.newOrder;
    const mockReturn = OrderModel.build(orderMocks.newOrder);
    sinon.stub(OrderModel, 'create').resolves(mockReturn);
    sinon.stub(ProductModel, 'update').resolves([2]);

    const serviceResponse = await orderService.addNewOrder(parameters);

    expect(serviceResponse.status).to.equal(201);
    expect(serviceResponse.data).to.eql(orderMocks.newOrder);
  });
});
