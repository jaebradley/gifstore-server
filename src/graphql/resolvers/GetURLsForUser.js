import {
  getAllForUserId,
} from '../../store/userURLs';
import {
  getByIds,
} from '../../store/urls';
import URL from '../../data/URL';

async function GetURLsForUser(userId) {
  const userURLs = await getAllForUserId(userId);
  const urlIds = userURLs.map(userURL => userURL.url_id);
  const urls = await getByIds(urlIds);
  return urls.map(url => URL(url));
}

export default GetURLsForUser;
