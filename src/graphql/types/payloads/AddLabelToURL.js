import {
  GraphQLObjectType,
  GraphQLNonNull,
} from 'graphql';

import {
  LabelEdge,
} from '../connections/Label';

const AddLabelToURL = new GraphQLObjectType({
  name: 'AddLabelToURLPayload',
  description: 'Payload after associating Label with URL',
  fields: {
    labelEdge: {
      type: GraphQLNonNull(LabelEdge),
    },
  },
});

export default AddLabelToURL;
