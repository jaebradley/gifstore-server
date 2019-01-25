import {
  connectionDefinitions,
} from 'graphql-relay';

import URLNodeType from '../URL';

const {
  connectionType: URLConnection,
  edgeType: URLEdge,
} = connectionDefinitions({
  name: 'URL',
  nodeType: URLNodeType,
});

export {
  URLConnection,
  URLEdge,
};
