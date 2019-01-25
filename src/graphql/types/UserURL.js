import {
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';
import {
  globalIdField,
} from 'graphql-relay';
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
