import {
  GraphQLInputObjectType,
  GraphQLID,
  GraphQLNonNull,
} from 'graphql';

const CreateCurrentUserURL = new GraphQLInputObjectType({
  name: 'CreateUserURLInput',
  description: 'Input when associating a URL with current User',
  fields: {
    urlId: {
      type: GraphQLNonNull(GraphQLID),
    },
  },
});

export default CreateCurrentUserURL;
