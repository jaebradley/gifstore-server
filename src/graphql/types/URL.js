import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import {
  globalIdField,
  connectionFromPromisedArray,
  connectionArgs,
} from 'graphql-relay';
import LabelsConnection from '../connections/Labels';
import getURLLabels from '../../data/getURLLabels';
import {
  nodeInterface,
} from '../NodeDefinitions';

const URL = new GraphQLObjectType({
  name: 'URL',
  interfaces: () => [nodeInterface],
  fields: {
    id: globalIdField('URL'),
    url: {
      type: GraphQLString,
    },
    labels: {
      type: LabelsConnection,
      description: 'Labels for URL',
      args: connectionArgs,
      resolve: (url, args) => connectionFromPromisedArray(getURLLabels(url.get('id')), args),
    },
  },
});

export default URL;
