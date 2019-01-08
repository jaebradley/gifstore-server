import jwt from 'jsonwebtoken';

import {
  JWT_SECRET,
} from './config';

function generateJWT({ providerId, provider }) {
  return jwt.sign({
    providerId,
    provider,
  },
  JWT_SECRET,
  {
    expiresIn: 60 * 120,
  });
}

export default generateJWT;
