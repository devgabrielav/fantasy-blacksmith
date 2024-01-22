import jwt from 'jsonwebtoken';
import { TokenPayload } from '../types/Token';

const secret = process.env.JWT_SECRET || 'secret';

const createToken = (payload: TokenPayload): string => {
  const token = jwt.sign(payload, secret);
  return token;
};

const verifyToken = (token: string): TokenPayload => {
  const data = jwt.verify(token, secret) as TokenPayload;

  return data;
};

export default {
  createToken,
  verifyToken,
};