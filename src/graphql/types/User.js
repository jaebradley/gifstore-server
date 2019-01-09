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
import GetURLsForUser from '../resolvers/GetURLsForUser';
import URLsConnection from '../connections/URLs';

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
      type: URLsConnection,
      description: 'URLs for user',
      args: connectionArgs,
      resolve: (user, args) => connectionFromPromisedArray(GetURLsForUser(user.get('id')), args),
    },
  },
});

export default User;
