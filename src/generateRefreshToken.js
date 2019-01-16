import jwt from 'jsonwebtoken';

import {
  REFRESH_TOKEN_SECRET,
} from './config';

function generateRefreshToken({ userId }) {
  return jwt.sign({
    userId,
  },
  REFRESH_TOKEN_SECRET,
  {
    // seconds in a week
    expiresIn: 604800,
  });
}

export default generateRefreshToken;
