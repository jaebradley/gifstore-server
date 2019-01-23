import {
  GraphQLObjectType,
} from 'graphql';
import {
  globalIdField,
} from 'graphql-relay';

const DeleteUserURLForCurrentUserPayload = new GraphQLObjectType({
  name: 'DeleteUserURLForCurrentUserPayload',
  description: 'Payload after deleting UserURL for current user',
  fields: {
    id: globalIdField('UserURL'),
  },
});

export default DeleteUserURLForCurrentUserPayload;
