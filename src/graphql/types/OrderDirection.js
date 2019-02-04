import {
  GraphQLEnumType,
} from 'graphql';

const OrderDirection = new GraphQLEnumType({
  name: 'OrderDirection',
  description: 'Possible directions to order a list of items',
  values: {
    ASCENDING: {
      value: 'ASCENDING',
    },
    DESCENDING: {
      value: 'DESCENDING',
    },
  },
});

export default OrderDirection;
