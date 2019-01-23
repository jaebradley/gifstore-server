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
import getUserURLs from '../data/getUserURLs';
import UserURLsConnection from '../connections/UserURLs';

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
      type: UserURLsConnection,
      description: 'URLs for user',
      args: connectionArgs,
      resolve: (user, args) => connectionFromPromisedArray(getUserURLs(user.get('id')), args),
    },
  },
});

export default User;
