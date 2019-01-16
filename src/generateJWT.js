import jwt from 'jsonwebtoken';

import {
  JWT_SECRET,
} from './config';

function generateJWT({ userId, refreshToken }) {
  return jwt.sign({
    userId,
    refreshToken,
  },
  JWT_SECRET,
  {
    // expire every 15 minutes
    expiresIn: 60 * 15,
  });
}

export default generateJWT;
