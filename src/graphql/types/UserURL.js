import {
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';
import {
  globalIdField,
  connectionFromPromisedArray,
  connectionArgs,
} from 'graphql-relay';
import LabelsConnection from '../connections/Labels';
import getURLLabels from '../data/getURLLabels';
import {
  nodeInterface,
} from '../NodeDefinitions';
import URLType from './URL';

const UserURL = new GraphQLObjectType({
  name: 'UserURL',
  description: 'A URL assigned to a User',
  interfaces: () => [nodeInterface],
  fields: {
    id: globalIdField('UserURL'),
    url: {
      type: GraphQLNonNull(URLType),
    },
  },
});

export default UserURL;
