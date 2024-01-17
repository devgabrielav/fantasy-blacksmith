import jwt from 'jsonwebtoken';
import { TokenPayload } from '../types/Token';

const secret = process.env.JWT_SECRET || 'secret';

const createToken = (payload: TokenPayload): string => {
  const token = jwt.sign(payload, secret);
  return token;
};

export default {
  createToken,
};