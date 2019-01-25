import {
  GraphQLObjectType,
} from 'graphql';
import {
  globalIdField,
} from 'graphql-relay';

const DeleteURLForCurrentUser = new GraphQLObjectType({
  name: 'DeleteURLForCurrentUserPayload',
  description: 'Payload after deleting URL for current User',
  fields: {
    id: globalIdField('URL'),
  },
});

export default DeleteURLForCurrentUser;
