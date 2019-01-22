import { connectionDefinitions } from 'graphql-relay';

import LabelType from '../types/Label';

const {
  connectionType: Labels,
} = connectionDefinitions({
  name: 'Labels',
  nodeType: LabelType,
});

export default Labels;
