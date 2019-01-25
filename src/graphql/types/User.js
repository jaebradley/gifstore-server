import {
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
import getURLsForUser from '../resolvers/getURLsForUser';
import {
  URLConnection,
} from './connections/URL';

const User = new GraphQLObjectType({
  name: 'User',
  description: 'An application user',
  interfaces: () => [nodeInterface],
  fields: {
    id: globalIdField('User'),
    emailAddress: {
      type: GraphQLString,
    },
    urls: {
      type: URLConnection,
      description: 'URLs associated with User',
      args: connectionArgs,
      resolve: (user, args) => connectionFromPromisedArray(getURLsForUser(user.get('id')), args),
    },
  },
});

export default User;
