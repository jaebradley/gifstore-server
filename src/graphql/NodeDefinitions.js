import {
  nodeDefinitions,
  fromGlobalId,
} from 'graphql-relay';

import { List } from 'immutable';
import User from '../data/User';
import URL from '../data/URL';
import Label from '../data/Label';
import UserURL from '../data/UserURL';

import UserType from './types/User';
import URLType from './types/URL';
import LabelType from './types/Label';
import UserURLType from './types/UserURL';

import {
  getById as getUserById,
} from '../store/users';
import {
  getById as getURLById,
} from '../store/urls';
import {
  getById as getLabelById,
} from '../store/labels';
import {
  getById as getUserURLById,
} from '../store/userURLs';
import getURLLabels from '../data/getURLLabels';

const { nodeInterface, nodeField } = nodeDefinitions(
  async (globalId) => {
    const {
      type,
      id,
    } = fromGlobalId(globalId);

    if (type === 'User') {
      const {
        id: userId,
        email_address: emailAddress,
      } = await getUserById(id);
      return User({ id: userId, emailAddress });
    }

    if (type === 'URL') {
      const {
        id: urlId,
        url,
      } = await getURLById(id);
      return URL({ id: urlId, url });
    }

    if (type === 'UserURL') {
      const {
        id: userURLId,
        url_id: urlId,
        user_id: userId,
      } = await getUserURLById(id);
      const user = await getUserById(userId);
      const url = await getURLById(urlId);
      const labels = await getURLLabels(urlId);
      return UserURL({
        id: userURLId,
        user: User(user),
        url: URL(url),
        labels,
      });
    }

    if (type === 'Label') {
      const {
        id: labelId,
        name,
      } = await getLabelById(id);
      return Label({ id: labelId, name });
    }

    return null;
  },
  (obj) => {
    if (obj instanceof User) {
      return UserType;
    }

    if (obj instanceof URL) {
      return URLType;
    }

    if (obj instanceof UserURL) {
      return UserURLType;
    }

    if (obj instanceof Label) {
      return LabelType;
    }

    return null;
  },
);

export {
  nodeInterface,
  nodeField,
};
