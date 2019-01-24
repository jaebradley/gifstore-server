import {
  fromGlobalId,
} from 'graphql-relay';
import createUserURLLabel from './createUserURLLabel';
import {
  getById as getUserURLById,
} from '../../store/userURLs';
import {
  getById as getLabelById,
} from '../../store/labels';

export default async function createUserURLLabelForCurrentUser({
  currentUser,
  args: {
    input: {
      userURLId: userURLGlobalId,
      labelId: labelGlobalId,
    },
  },
}) {
  const {
    type: userURLType,
    id: userURLId,
  } = fromGlobalId(userURLGlobalId);

  if (userURLType !== 'UserURL') {
    throw new Error('Expected a UserURL id');
  }

  const {
    type: labelType,
    id: labelId,
  } = fromGlobalId(labelGlobalId);

  if (labelType !== 'Label') {
    throw new Error('Expected a Label id');
  }

  const [
    userURL,
    label,
  ] = await Promise.all([
    getUserURLById(userURLId),
    getLabelById(labelId),
  ]);

  if (!userURL) {
    throw new Error('Unknown UserURL');
  }

  if (!label) {
    throw new Error('Unknown Label');
  }

  if (Number(userURL.user_id) !== currentUser.id) {
    throw new Error('Unavailable UserURL');
  }

  console.log(userURL);
  console.log(label);

  return createUserURLLabel({
    userURLId: Number(userURL.id),
    labelId: Number(label.id),
  });
}
