import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
} from 'graphql';


const User = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLInt },
    emailAddress: { type: GraphQLString },
  }),
});

export default User;
