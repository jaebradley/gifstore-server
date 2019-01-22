import {
  nodeDefinitions,
  fromGlobalId,
} from 'graphql-relay';

import User from '../data/User';
import URL from '../data/URL';
import Label from '../data/Label';

import UserType from './types/User';
import URLType from './types/URL';
import LabelType from './types/Label';

import {
  getById as getUserById,
} from '../store/users';
import {
  getById as getURLById,
} from '../store/urls';
import {
  getById as getLabelById,
} from '../store/labels';

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

    if (type === 'Label') {
      const {
        id: labelId,
        name,
      } = getLabelById(id);
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
