import {
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';

import {
  URLEdge,
} from '../connections/URL';

const CreateUserURL = new GraphQLObjectType({
  name: 'CreateUserURLPayload',
  description: 'Payload after associating a URL with a User',
  fields: {
    urlEdge: {
      type: GraphQLNonNull(URLEdge),
    },
  },
});

export default CreateUserURL;
