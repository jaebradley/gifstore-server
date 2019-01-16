import generateJWT from '../generateJWT';
import generateRefreshToken from '../generateRefreshToken';
import {
  create as createRefreshToken,
} from '../store/userRefreshTokens';

async function create(userId) {
  const refreshToken = generateRefreshToken({ userId });
  await createRefreshToken({ userId, refreshToken });
  return {
    jwt: generateJWT({ userId }),
    refreshToken,
  };
}

export default create;
