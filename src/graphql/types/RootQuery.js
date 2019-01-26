import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLObjectType,
} from 'graphql';

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
    node: nodeField,
  },
});

export default RootQuery;
