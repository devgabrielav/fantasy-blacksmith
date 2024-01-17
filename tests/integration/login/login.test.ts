import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import loginMocks from '../../mocks/login.mocks';
import app from '../../../src/app';
import UserModel from '../../../src/database/models/user.model';
import bcrypt from 'bcryptjs';

chai.use(chaiHttp);

describe('POST /login', function () { 
  beforeEach(function () { sinon.restore(); });
  it('Ao não passar "username", retorna um erro', async function () {
    const requestBody = loginMocks.loginWithNoUsername;
    
    const response = await chai.request(app).post('/login').send(requestBody);

    expect(response.status).to.equal(400);
    expect(response.body).to.eql({ message: '"username" and "password" are required' });
  });

  it('Ao não passar "password", retorna um erro', async function () {
    const requestBody = loginMocks.loginWithNoPassword;
    
    const response = await chai.request(app).post('/login').send(requestBody);

    expect(response.status).to.equal(400);
    expect(response.body).to.eql({ message: '"username" and "password" are required' });
  });

  it('Ao passar um "username" inválido, retorna um erro', async function () {
    const requestBody = loginMocks.loginWithInvalidUsername;
    sinon.stub(UserModel, 'findOne').resolves(null);

    const response = await chai.request(app).post('/login').send(requestBody);

    expect(response.status).to.equal(401);
    expect(response.body).to.eql({ message: 'Username or password invalid' });
  });

  it('Ao passar um "password" inválido, retorna um erro', async function () {
    const requestBody = loginMocks.loginWithInvalidPassword;
    const mockReturn = UserModel.build(loginMocks.existingUser);
    sinon.stub(UserModel, 'findOne').resolves(mockReturn);

    const response = await chai.request(app).post('/login').send(requestBody);

    expect(response.status).to.equal(401);
    expect(response.body).to.eql({ message: 'Username or password invalid' });
  });

  it('É possivel realizar um login com sucesso', async function () {
    const requestBody = loginMocks.correctLogin;
    const mockReturn = UserModel.build(loginMocks.existingUser);
    sinon.stub(UserModel, 'findOne').resolves(mockReturn);
    
    const response = await chai.request(app).post('/login').send(requestBody);

    expect(response.status).to.equal(200);
    expect(response.body).to.have.key('token');
  });
});
