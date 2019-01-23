import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLID,
} from 'graphql';

const DeleteUserURLForCurrentUser = new GraphQLInputObjectType({
  name: 'DeleteUserURLForCurrentUserInput',
  fields: {
    userURLId: {
      type: GraphQLNonNull(GraphQLID),
    },
  },
});

export default DeleteUserURLForCurrentUser;
