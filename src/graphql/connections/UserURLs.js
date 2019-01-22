import { connectionDefinitions } from 'graphql-relay';

import UserURLType from '../types/UserURL';

const {
  connectionType: UserURLs,
} = connectionDefinitions({
  name: 'UserURLs',
  nodeType: UserURLType,
});

export default UserURLs;
