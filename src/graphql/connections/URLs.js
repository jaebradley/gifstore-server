import { connectionDefinitions } from 'graphql-relay';

import URLType from '../types/URL';

const {
  connectionType: URLs,
} = connectionDefinitions({
  name: 'URLs',
  nodeType: URLType,
});

export default URLs;
