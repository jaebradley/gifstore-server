import {
  nodeDefinitions,
  fromGlobalId,
} from 'graphql-relay';

import User from '../data/User';
import URL from '../data/URL';

import UserType from './types/User';
import URLType from './types/URL';

import {
  getById as getUserById,
} from '../store/users';
import {
  getById as getURLById,
} from '../store/urls';

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const {
      type,
      id,
    } = fromGlobalId(globalId);

    if (type === 'User') {
      const {
        id: userId,
        email_address: emailAddress,
      } = getUserById(id);
      return User({ id: userId, emailAddress });
    }

    if (type === 'URL') {
      const {
        id: urlId,
        url,
      } = getURLById(id);
      return URL({ id: urlId, url });
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

    return null;
  },
);

export {
  nodeInterface,
  nodeField,
};
