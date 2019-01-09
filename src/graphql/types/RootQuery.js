import {
  GraphQLObjectType,
} from 'graphql';

import {
  getById,
} from '../../store/users';
import UserType from './User';
import User from '../../data/User';
import {
  nodeField,
} from '../NodeDefinitions';

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
    node: nodeField,
  },
});

export default RootQuery;
