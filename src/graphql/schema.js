import {
  GraphQLSchema,
} from 'graphql';

import RootQuery from './types/RootQuery';
import RootMutation from './mutations/Root';

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});

export default schema;
