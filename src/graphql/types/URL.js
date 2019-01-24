import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import {
  globalIdField,
  connectionFromPromisedArray,
  connectionArgs,
} from 'graphql-relay';

import {
  nodeInterface,
} from '../NodeDefinitions';
import LabelsConnection from '../connections/Labels';
import getLabelsForURL from '../resolvers/getLabelsForURL';

const URL = new GraphQLObjectType({
  name: 'URL',
  description: 'URL',
  interfaces: () => [nodeInterface],
  fields: {
    id: globalIdField('URL'),
    url: {
      type: GraphQLNonNull(GraphQLString),
    },
    labels: {
      type: LabelsConnection,
      description: 'Labels for URL assigned to a User',
      args: connectionArgs,
      resolve: (url, args, context) => connectionFromPromisedArray(getLabelsForURL(url.get('id'), context), args),
    },
  },
});

export default URL;
