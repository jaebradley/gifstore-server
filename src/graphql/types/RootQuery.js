import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLObjectType,
  GraphQLID,
} from 'graphql';
import {
  globalIdField,
  connectionFromPromisedArray,
  connectionArgs,
} from 'graphql-relay';

import getUserURLs from 'GraphQL/resolvers/getUserURLs';
import {
  getById,
} from '../../store/users';
import UserType from './User';
import User from '../../data/User';
import URLType from './URL';
import {
  nodeField,
} from '../NodeDefinitions';
import getURLByValue from '../resolvers/getURLByValue';
import { URLConnection } from './connections/URL';
import UserURLOrder from './UserURLOrder';

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    me: {
      type: UserType,
      args: {},
      resolve: async (parent, args, context) => {
        const {
          id,
          email_address: emailAddress,
        } = await getById(context.currentUser.id);
        return User({
          id,
          emailAddress,
        });
      },
    },
    url: {
      type: URLType,
      args: {
        value: {
          type: GraphQLNonNull(GraphQLString),
        },
      },
      resolve: getURLByValue,
    },
    userURLs: {
      type: URLConnection,
      description: 'Look up URLs for a User',
      // TODO: @jaebradley add custom args here
      args: {
        userId: {
          type: GraphQLNonNull(GraphQLID),
        },
        orderBy: {
          type: UserURLOrder,
        },
        ...connectionArgs,
      },
      resolve: getUserURLs,
    },
    node: nodeField,
  },
});

export default RootQuery;
