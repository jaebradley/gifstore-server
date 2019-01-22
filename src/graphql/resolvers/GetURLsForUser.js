import {
  getAllForUserId,
} from '../../store/userURLs';
import {
  getById,
} from '../../store/urls';
import URL from '../../data/URL';

async function GetURLsForUser(userId) {
  const userURLs = await getAllForUserId(userId);
  return userURLs.map(async (userURL) => {
    const url = await getById(userURL.url_id);
    return URL({ id: userURL.id, url: url.url });
  });
}

export default GetURLsForUser;
