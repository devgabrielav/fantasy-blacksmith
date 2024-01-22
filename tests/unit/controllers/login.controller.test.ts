import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import loginMocks from '../../mocks/login.mocks';
import { ResponseType } from '../../../src/types/Response';
import loginServices from '../../../src/services/login.service';
import loginController from '../../../src/controllers/login.controller';

chai.use(sinonChai);

describe('LoginController', function () {
  const req = {} as Request;
  const res = {} as Response;
  const messageNoUserOrPassword = '"username" and "password" are required';
  const messageInvalidUserOrPassword = 'Username or password invalid';

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('Ao não receber username, retorne um erro', async function () {
    req.body = loginMocks.loginWithNoUsername;

    const serviceResponse: ResponseType<string> = {
      status: 400,
      data: messageNoUserOrPassword,
    };

    sinon.stub(loginServices, 'verifyLogin').resolves(serviceResponse);

    await loginController.login(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: messageNoUserOrPassword });
  });

  it('Ao não receber password, retorne erro', async function () {
    req.body = loginMocks.loginWithNoPassword;

    const serviceResponse: ResponseType<string> = {
      status: 400,
      data: messageNoUserOrPassword,
    };

    sinon.stub(loginServices, 'verifyLogin').resolves(serviceResponse);

    await loginController.login(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: messageNoUserOrPassword });
  });

  it('Ao receber um user inválido, retorne erro', async function () {
    req.body = loginMocks.loginWithInvalidUsername;

    const serviceResponse: ResponseType<string> = {
      status: 401,
      data: messageInvalidUserOrPassword,
    };

    sinon.stub(loginServices, 'verifyLogin').resolves(serviceResponse);

    await loginController.login(req, res);

    expect(res.status).to.have.been.calledWith(401);
    expect(res.json).to.have.been.calledWith({ message: messageInvalidUserOrPassword });
  });

  it('Ao receber um password inválido, retorne erro', async function () {
    req.body = loginMocks.loginWithInvalidPassword;

    const serviceResponse: ResponseType<string> = {
      status: 401,
      data: messageInvalidUserOrPassword,
    };

    sinon.stub(loginServices, 'verifyLogin').resolves(serviceResponse);

    await loginController.login(req, res);

    expect(res.status).to.have.been.calledWith(401);
    expect(res.json).to.have.been.calledWith({ message: messageInvalidUserOrPassword });
  });

  it('Ao receber um user e password corretos, retorna um token', async function () {
    req.body = loginMocks.correctLogin;

    const token =  'm1nh4t0k3nbcr1p7v4l1d4';
    const serviceResponse: ResponseType<string> = {
      status: 200,
      data: token,
    };

    sinon.stub(loginServices, 'verifyLogin').resolves(serviceResponse);

    await loginController.login(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({ token: token });
  });

});
