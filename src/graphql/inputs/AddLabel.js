import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLID,
} from 'graphql';

const AddLabel = new GraphQLInputObjectType({
  name: 'AddLabelInput',
  fields: {
    userURLId: {
      type: GraphQLNonNull(GraphQLID),
    },
    labelId: {
      type: GraphQLNonNull(GraphQLID),
    },
  },
});

export default AddLabel;
