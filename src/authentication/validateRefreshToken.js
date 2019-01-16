import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import {
  REFRESH_TOKEN_SECRET,
} from '../config';
import {
  getLast,
} from '../store/userRefreshTokens';
import InvalidRefreshToken from '../errors/InvalidRefreshToken';

export default async function validateRefreshToken(token) {
  const {
    userId,
  } = jwt.verify(token, REFRESH_TOKEN_SECRET);
  const lastUserRefreshToken = await getLast({ userId });
  const isLastUserRefreshToken = await bcrypt.compare(token, lastUserRefreshToken.refresh_token);
  if (isLastUserRefreshToken) {
    return { userId };
  }

  throw new InvalidRefreshToken(userId);
}
