import {
  getById as getUserURLLabelById,
} from '../../store/userURLLabels';
import getUserURL from './getUserURL';
import {
  getById as getLabelById,
} from '../../store/labels';
import Label from '../types/Label';
import UserURLLabel from '../types/UserURLLabel';

export default async function getUserURLLabel(userURLLabelId) {
  const userURLLabel = await getUserURLLabelById(userURLLabelId);
  const [
    userURL,
    label,
  ] = await Promise.all([
    getUserURL(userURLLabel.user_url_id),
    getLabelById(userURLLabel.label_id),
  ]);
  return UserURLLabel({
    userURL,
    label: Label(label),
  });
}
