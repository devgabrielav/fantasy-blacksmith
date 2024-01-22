import { expect } from 'chai';
import sinon from 'sinon';
import loginMock from '../../mocks/login.mocks';
import loginServices from '../../../src/services/login.service';
import UserModel from '../../../src/database/models/user.model';

describe('LoginService', function () {
  beforeEach(function () { sinon.restore(); });

  it('Ao não receber um username, retorne um erro', async function () {
    const parameters = loginMock.loginWithNoUsername;
    const serviceResponse = await loginServices.verifyLogin(parameters);

    expect(serviceResponse.status).to.equal(400);
    expect(serviceResponse.data).not.to.have.key('token');
    expect(serviceResponse.data).to.deep.equal('"username" and "password" are required');
  });

  it('Ao não receber um password, retorne um erro', async function () {
    const parameters = loginMock.loginWithNoPassword;
    const serviceResponse = await loginServices.verifyLogin(parameters);

    expect(serviceResponse.status).to.equal(400);
    expect(serviceResponse.data).not.to.have.key('token');
    expect(serviceResponse.data).to.deep.equal('"username" and "password" are required');
  });

  it('Ao receber um username inexistente, retorne um erro', async function () {
    const parameters = loginMock.loginWithInvalidUsername;
    sinon.stub(UserModel, 'findOne').resolves(null);

    const serviceResponse = await loginServices.verifyLogin(parameters);

    expect(serviceResponse.status).to.equal(401);
    expect(serviceResponse.data).not.to.have.key('token');
    expect(serviceResponse.data).to.deep.equal('Username or password invalid');
  });

  it('Ao receber um password incorreto, retorne um erro', async function () {
    const parameters = loginMock.existingUser;
    const mockReturn = UserModel.build(parameters);
    sinon.stub(UserModel, 'findOne').resolves(mockReturn);

    const serviceResponse = await loginServices.verifyLogin(loginMock.loginWithInvalidPassword);

    expect(serviceResponse.status).to.equal(401);
    expect(serviceResponse.data).not.to.have.key('token');
    expect(serviceResponse.data).to.deep.equal('Username or password invalid');
  });

  it('Ao receber um username e password corretos, retorna um token', async function () {
    const parameters = loginMock.correctLogin;
    const mockReturn = UserModel.build(loginMock.existingUser);
    sinon.stub(UserModel, 'findOne').resolves(mockReturn);

    const serviceResponse = await loginServices.verifyLogin(parameters);

    expect(serviceResponse.status).to.equal(200);
    expect(typeof serviceResponse.data).to.be.equal('string');
  });
});
