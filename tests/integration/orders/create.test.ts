import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import orderMocks from '../../mocks/orders.mocks';
import OrderModel from '../../../src/database/models/order.model';
import app from '../../../src/app';
import middleware from '../../../src/middlewares/auth.middleware';

chai.use(chaiHttp);

describe('POST /orders', function () { 
  beforeEach(function () { sinon.restore(); });

});
