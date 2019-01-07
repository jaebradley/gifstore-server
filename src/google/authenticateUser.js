import {
  google,
} from 'googleapis';

import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} from '../config';

function authenticate() {
  return new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
  );
}

function getGooglePlusApi(auth) {
  return google.plus({ version: 'v1', auth });
}

/**
 * Take the "code" parameter which Google gives us once when the user logs in,
 * then get the user's email and id.
 */
async function authenticateUser(token) {
  const auth = authenticate();
  auth.setCredentials({ access_token: token });
  const plus = getGooglePlusApi(auth);
  const me = await plus.people.get({ userId: 'me' });
  const userGoogleId = me.data.id;
  const userGoogleEmail = me.data.emails && me.data.emails.length && me.data.emails[0].value;
  return {
    id: userGoogleId,
    emailAddress: userGoogleEmail,
  };
}

export default authenticateUser;
