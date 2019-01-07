import authenticateUser from '../../../google/authenticateUser';

async function handleAuthentication(request) {
  const {
    query,
  } = request;
  const {
    code,
  } = query;
  const userDetails = await authenticateUser(code);
  const {
    emailAddress,
  } = userDetails;
  console.log('email is', emailAddress);
}

export default handleAuthentication;
