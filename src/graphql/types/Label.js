import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';
import {
  globalIdField,
} from 'graphql-relay';
import {
  nodeInterface,
} from '../NodeDefinitions';

const Label = new GraphQLObjectType({
  name: 'Label',
  description: 'Text-based identifier for item',
  interfaces: () => [nodeInterface],
  fields: {
    id: globalIdField('Label'),
    name: {
      type: GraphQLNonNull(GraphQLString),
    },
  },
});

export default Label;
