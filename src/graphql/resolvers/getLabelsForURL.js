import {
  getAllForURLId as getAllUserURLsForURLId,
} from '../../store/userURLs';
import Label from '../data/nodes/Label';
import {
  getAllForUserURLs as getAllUserURLLabelsForUserURLs,
} from '../../store/userURLLabels';
import {
  getByIds as getLabelsByIds,
} from '../../store/labels';

export default async function getURLLabels(urlId, context) {
  console.log(urlId);
  console.log(context);
  const userURLs = await getAllUserURLsForURLId(urlId);
  const userURLLabels = await getAllUserURLLabelsForUserURLs(userURLs.map(userURL => userURL.id));
  const labels = await getLabelsByIds(userURLLabels.map(uul => uul.label_id));
  return labels.map(label => Label(label));
}
