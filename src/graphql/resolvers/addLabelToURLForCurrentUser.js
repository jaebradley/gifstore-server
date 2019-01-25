import {
  fromGlobalId,
} from 'graphql-relay';
import createUserURLLabel from './createUserURLLabel';
import {
  get as getUserURL,
} from '../../store/userURLs';
import {
  getById as getLabelById,
} from '../../store/labels';

export default async function addLabelToURLForCurrentUser({
  currentUser,
  args: {
    input: {
      urlId: urlGlobalId,
      labelId: labelGlobalId,
    },
  },
}) {
  const {
    type: urlType,
    id: urlId,
  } = fromGlobalId(urlGlobalId);

  if (urlType !== 'URL') {
    throw new Error('Expected a URL id');
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
    getUserURL({ urlId, userId: currentUser.id }),
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

  return createUserURLLabel({
    userURLId: Number(userURL.id),
    labelId: Number(label.id),
  });
}
