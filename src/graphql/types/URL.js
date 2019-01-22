import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import {
  globalIdField,
} from 'graphql-relay';
import {
  nodeInterface,
} from '../NodeDefinitions';

const URL = new GraphQLObjectType({
  name: 'URL',
  description: 'URL',
  interfaces: () => [nodeInterface],
  fields: {
    id: globalIdField('URL'),
    url: {
      type: GraphQLNonNull(GraphQLString),
    },
  },
});

export default URL;
