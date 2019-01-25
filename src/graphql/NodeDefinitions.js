import {
  nodeDefinitions,
  fromGlobalId,
} from 'graphql-relay';

import User from './data/nodes/User';
import URL from './data/nodes/URL';
import Label from './data/nodes/Label';

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
