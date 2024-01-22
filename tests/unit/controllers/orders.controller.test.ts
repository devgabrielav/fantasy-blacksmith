import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import orderMocks from '../../mocks/orders.mocks';
import orderServices from '../../../src/services/orders.service';
import { ResponseArrayType, ResponseType } from '../../../src/types/Response';
import { NewOrder, OrderIds } from '../../../src/types/Order';
import orderController from '../../../src/controllers/orders.controller';

chai.use(sinonChai);

describe('OrdersController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  describe('GET /orders', function () {
    it('Busca todos os pedidos com sucesso', async function () {
      const serviceResponse: ResponseArrayType<OrderIds> = {
        status: 200,
        data: orderMocks.allOrdersMock,
      };

      sinon.stub(orderServices, 'getAllOrders').resolves(serviceResponse);

      await orderController.getAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(orderMocks.allOrdersMock);
    });

    describe('POST /orders', function () {
      it('Adiciona um pedido com sucesso', async function () {
        req.body = orderMocks.newOrder;
        const serviceResponse: ResponseType<NewOrder> = {
          status: 201,
          data: orderMocks.newOrder,
        };

        sinon.stub(orderServices, 'addNewOrder').resolves(serviceResponse);

        await orderController.addOrder(req, res);

        expect(res.status).to.have.been.calledWith(201);
        expect(res.json).to.have.been.calledWith(orderMocks.newOrder);
      });
    });
  });
});
