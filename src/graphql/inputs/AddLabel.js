import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

const AddLabel = new GraphQLInputObjectType({
  name: 'AddLabelInput',
  fields: {
    url: {
      type: GraphQLNonNull(GraphQLString),
    },
    name: {
      type: GraphQLNonNull(GraphQLString),
    },
  },
});

export default AddLabel;
