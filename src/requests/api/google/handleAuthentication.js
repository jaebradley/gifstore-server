import authenticateUser from '../../../google/authenticateUser';
import {
  create,
  get,
} from '../../../store/users';
import createAuthentication from '../../../authentication/create';

async function handleAuthentication(request, response, next) {
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
  try {
    const userDetails = await authenticateUser(token);
    const {
      id: providerId,
      emailAddress,
    } = userDetails;
    // TODO: @jaebradley probably want to wrap this in a transaction
    const user = await get({ provider: 'GOOGLE', providerId });
    if (!user) {
      await create({ emailAddress, provider: 'GOOGLE', providerId });
    }
    const {
      jwt,
      refreshToken,
    } = await createAuthentication(user.id);
    response.statusCode = 200;
    response.setHeader('x-gifstore-auth-token', jwt);
    response.setHeader('x-gifstore-refresh-token', refreshToken);
    response.json({
      message: 'Authenticated',
    });
  } catch (e) {
    console.error(e);
    response.statusCode = 500;
    response.json({
      message: 'Server error when authenticating user',
    });
  }
}

export default handleAuthentication;
