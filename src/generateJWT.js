import jwt from 'jsonwebtoken';

import {
  JWT_SECRET,
} from './config';

function generateJWT({ userId }) {
  return jwt.sign({
    userId,
  },
  JWT_SECRET,
  {
    // expire every 7 days
    expiresIn: 60 * 60 * 24 * 7,
  });
}

export default generateJWT;
