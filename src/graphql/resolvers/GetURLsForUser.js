import {
  List,
} from 'immutable';
import {
  get,
  getAllForUserId,
} from '../../store/userURLs';
import {
  getByIds,
  getById,
} from '../../store/urls';
import URL from '../../data/URL';
import Label from '../../data/Label';
import {
  getAllForUserURL,
} from '../../store/userURLLabels';
import getURLLabels from '../../data/getURLLabels';

async function GetURLsForUser(userId) {
  const userURLs = await getAllForUserId(userId);
  return userURLs.map(async (userURL) => {
    const url = await getById(userURL.url_id);
    return URL({ id: userURL.id, url: url.url });
  });
}

export default GetURLsForUser;
