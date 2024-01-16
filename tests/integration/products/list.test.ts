import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import ProductModel from '../../../src/database/models/product.model';
import productsMock from '../../mocks/products.mock';
import app from '../../../src/app';

chai.use(chaiHttp);

describe('GET /products', function () { 
  beforeEach(function () { sinon.restore(); });

  it('Busca todos os produtos com sucesso', async function () {
    const mockReturn = ProductModel.bulkBuild(productsMock.returnArrayProductsMock);
    sinon.stub(ProductModel, 'findAll').resolves(mockReturn);

    const response = await chai.request(app).get('/products').send();

    expect(response.status).to.equal(200);
    expect(response.body).to.eql(productsMock.returnArrayProductsMock);
  });

});
