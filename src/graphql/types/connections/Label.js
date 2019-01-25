import {
  connectionDefinitions,
} from 'graphql-relay';

import LabelNodeType from '../Label';

const {
  connectionType: LabelConnection,
  edgeType: LabelEdge,
} = connectionDefinitions({
  name: 'Label',
  nodeType: LabelNodeType,
});

export {
  LabelConnection,
  LabelEdge,
};
