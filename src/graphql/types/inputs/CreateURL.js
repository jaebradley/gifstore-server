import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull,
} from 'graphql';

const CreateURL = new GraphQLInputObjectType({
  name: 'CreateURLInput',
  description: 'Input for creating a URL',
  fields: {
    url: {
      type: GraphQLNonNull(GraphQLString),
    },
  },
});

export default CreateURL;
