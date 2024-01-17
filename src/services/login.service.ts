import bcrypt from 'bcryptjs';
import UserModel from '../database/models/user.model';
import jwtUtil from '../utils/jwt.util';
import { Login } from '../types/Login';
import { ResponseType } from '../types/Response';

const verifyLogin = async (login: Login): Promise<ResponseType<string>> => {
  if (!login.username || !login.password) {
    return { status: 400, data: '"username" and "password" are required' };
  }

  const correctUser = await UserModel.findOne({ where: { username: login.username } });

  if (!correctUser || !bcrypt.compareSync(login.password, correctUser.dataValues.password)) {
    return { status: 401, data: 'Username or password invalid' };
  }

  const { id, username } = correctUser.dataValues;
  const token = jwtUtil.createToken({ id, username });

  return { status: 200, data: token };
};

export default {
  verifyLogin,
};