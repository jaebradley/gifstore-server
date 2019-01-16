import createAuthentication from '../../../authentication/create';
import validateRefreshToken from '../../../authentication/validateRefreshToken';

async function handleRefreshCredentials(request, response, next) {
  if (!request.body.token) {
    response.statusCode = 400;
    response.json({
      message: 'Invalid request',
    });
    next();
  }

  const {
    token,
  } = request.body;
  let userId;

  try {
    ({ userId } = await validateRefreshToken(token));
  } catch (e) {
    response.statusCode = 400;
    response.json({
      message: 'Invalid Refresh Token',
    });
    next();
  }

  let jwt;
  let newRefreshToken;

  try {
    ({
      jwt,
      refreshToken: newRefreshToken,
    } = await createAuthentication(userId));
  } catch (e) {
    response.statusCode = 500;
    response.json({
      message: 'Server error when generating tokens',
    });
    next();
  }

  response.statusCode = 200;
  response.setHeader('x-gifstore-auth-token', jwt);
  response.setHeader('x-gifstore-refresh-token', newRefreshToken);
  response.json({
    message: 'Authenticated',
  });
}

export default handleRefreshCredentials;
