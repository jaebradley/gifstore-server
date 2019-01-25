import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

const CreateLabel = new GraphQLInputObjectType({
  name: 'CreateLabelInput',
  fields: {
    name: {
      type: GraphQLNonNull(GraphQLString),
    },
  },
});

export default CreateLabel;
