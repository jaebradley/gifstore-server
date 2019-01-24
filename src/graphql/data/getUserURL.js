import {
  getById,
} from '../../store/userURLs';
import {
  getById as getURLById,
} from '../../store/urls';
import {
  getById as getUserById,
} from '../../store/users';
import User from './nodes/User';
import UserURL from './nodes/UserURL';
import URL from './nodes/URL';

export default async function getUserURL(id) {
  const userURL = await getById(id);
  const [
    user,
    url,
  ] = await Promise.all([
    getUserById(userURL.user_id),
    getURLById(userURL.url_id),
  ]);
  return UserURL({
    id: Number(userURL.id),
    url: URL({
      id: Number(url.id),
      url: url.url,
    }),
    user: User({
      id: Number(user.id),
      emailAddress: user.emailAddress,
    }),
  });
}
