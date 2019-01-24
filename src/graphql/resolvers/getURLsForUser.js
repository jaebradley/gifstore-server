import {
  getAllForUserId as getUserURLsForUserId,
} from '../../store/userURLs';
import {
  getByIds as getURLsByIds,
} from '../../store/urls';
import URL from '../data/nodes/URL';

export default async function getURLsForUser(userId) {
  const userURLs = await getUserURLsForUserId(userId);
  const urlIds = userURLs.map(userURL => userURL.url_id);
  const urls = await getURLsByIds(urlIds);
  return urls.map(url => URL({
    id: Number(url.id),
    url: url.url,
  }));
}
