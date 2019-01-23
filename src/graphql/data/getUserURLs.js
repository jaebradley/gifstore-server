import {
  getAllForUserId,
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

async function getUserURLs(userId) {
  const user = await getUserById(userId);
  const userURLs = await getAllForUserId(userId);
  return userURLs.map(async (userURL) => {
    const url = await getURLById(userURL.url_id);
    return UserURL({
      id: userURL.id,
      url: URL({
        id: url.id,
        url: url.url,
      }),
      user: User(user),
    });
  });
}

export default getUserURLs;
