import {
  GraphQLEnumType,
} from 'graphql';

const UserURLOrderField = new GraphQLEnumType({
  name: 'UserURLOrderField',
  description: "Field to order a User's URLs by",
  values: {
    CREATED_AT: {
      value: 'CREATED_AT',
    },
  },
});

export default UserURLOrderField;
