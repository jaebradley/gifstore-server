import {
  getByURL,
} from '../../store/urls';
import URL from '../data/nodes/URL';

export default async function getURLByValue(_, args) {
  const url = await getByURL(args.value);
  if (!url) {
    return null;
  }
  return URL(url);
}
