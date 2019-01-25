import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLID,
} from 'graphql';

const DeleteURLForCurrentUser = new GraphQLInputObjectType({
  name: 'DeleteURLForCurrentUserInput',
  fields: {
    urlId: {
      type: GraphQLNonNull(GraphQLID),
    },
  },
});

export default DeleteURLForCurrentUser;
