import {
  getAllForUserId,
} from '../store/userURLs';
import {
  getById as getURLById,
} from '../store/urls';
import {
  getById as getUserById,
} from '../store/users';
import User from './User';
import UserURL from './UserURL';
import URL from './URL';

async function getUserURLs(userId) {
  const user = await getUserById(userId);
  const userURLs = await getAllForUserId(userId);
  return userURLs.map(async (userURL) => {
    const url = await getURLById(userURL.url_id);
    return UserURL({
      id: userURL.id,
      url: URL({ id: userURL.id, url: url.url }),
      user: User(user),
    });
  });
}

export default getUserURLs;
