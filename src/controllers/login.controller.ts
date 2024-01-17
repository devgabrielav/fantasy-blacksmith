import { RequestHandler } from 'express';
import loginService from '../services/login.service';

const login: RequestHandler = async (req, res) => {
  const { username, password } = req.body;

  const { status, data } = await loginService.verifyLogin({ username, password });

  if (status !== 200) {
    return res.status(status).json({ message: data });
  }

  res.status(status).json({ token: data });
};

export default {
  login,
};
