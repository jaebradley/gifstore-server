import {
  GraphQLInputObjectType,
  GraphQLNonNull,
} from 'graphql';

import OrderDirection from './OrderDirection';
import UserURLOrderField from './UserURLOrderField';

const UserURLOrder = new GraphQLInputObjectType({
  name: 'UserURLOrder',
  description: "Ordering options for a User's URLs",
  fields: {
    direction: {
      type: GraphQLNonNull(OrderDirection),
    },
    field: {
      type: GraphQLNonNull(UserURLOrderField),
    },
  },
});

export default UserURLOrder;
