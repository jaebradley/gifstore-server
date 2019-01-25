import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLID,
} from 'graphql';

const AddLabel = new GraphQLInputObjectType({
  name: 'AddLabelInput',
  fields: {
    urlId: {
      type: GraphQLNonNull(GraphQLID),
    },
    labelId: {
      type: GraphQLNonNull(GraphQLID),
    },
  },
});

export default AddLabel;
