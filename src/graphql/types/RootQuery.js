import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLNonNull,
} from 'graphql';

import {
  getById,
} from '../../store/users';
import User from './User';

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    user: {
      type: User,
      args: { id: { type: GraphQLNonNull(GraphQLInt) } },
      resolve: async (parent, args, context) => {
        if (context.currentUser.id === args.id) {
          const user = await getById(context.currentUser.id);
          return {
            id: user.id,
            emailAddress: user.email_address,
          };
        }

        throw new Error('Unauthorized');
      },
    },
  },
});

export default RootQuery;
