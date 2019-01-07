import {
  GraphQLObjectType,
  GraphQLInt,
} from 'graphql';

import User from './User';

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    user: {
      type: User,
      args: { id: { type: GraphQLInt } },
      resolve: (parent, args) => {
        console.log('parent', parent);
        console.lgog('args', args);
        // logic for serving data
      },
    },
  },
});

export default RootQuery;
