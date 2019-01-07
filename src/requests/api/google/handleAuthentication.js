import authenticateUser from '../../../google/authenticateUser';
import generateJWT from '../../../generateJWT';
import {
  create,
} from '../../../store/users';

async function handleAuthentication(request, response) {
  const {
    token,
  } = request.body;
  const userDetails = await authenticateUser(token);
  const {
    id: providerId,
    emailAddress,
  } = userDetails;
  // TODO: @jaebradley probably want to wrap this in a transaction
  await create({ emailAddress, provider: 'GOOGLE', providerId });
  const jwt = generateJWT({ providerId, provider: 'GOOGLE' });
  response.statusCode = 200;
  response.setHeader('x-gifstore-auth-token', jwt);
  response.json({
    message: 'Authenticated',
  });
}

export default handleAuthentication;
