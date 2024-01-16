import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import productsMock from '../../mocks/products.mock';
import ProductModel from '../../../src/database/models/product.model';

chai.use(chaiHttp);

describe('POST /products', function () { 
  beforeEach(function () { sinon.restore(); });

  it('Cadastra um novo produto com sucesso', async function () {
    const requestBody = productsMock.addProductMock;
    const mockReturn = ProductModel.build(productsMock.returnProductMock);
    sinon.stub(ProductModel, 'create').resolves(mockReturn);
    
    const response = await chai.request(app).post('/products').send(requestBody);

    expect(response.status).to.equal(201);
    expect(response.body).to.eql(productsMock.returnProductMock);
  });

});
