import {
  GraphQLSchema,
} from 'graphql';

import RootQuery from './types/RootQuery';

const schema = new GraphQLSchema({
  query: RootQuery,
});

export default schema;
