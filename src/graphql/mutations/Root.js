import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
} from 'graphql';
import {
  fromGlobalId,
} from 'graphql-relay';
import URLType from '../types/URL';
import UserURLType from '../types/UserURL';
import DeleteUserURLForCurrentUserPayloadType from '../types/DeleteUserURLForCurrentUserPayload';
import LabelType from '../types/Label';
import UserURLLabelType from '../types/UserURLLabel';
import AddLabelInput from '../inputs/AddLabel';
import DeleteUserURLForCurrentUserInput from '../inputs/DeleteUserURLForCurrentUser';
import CreateLabelInput from '../inputs/CreateLabel';
import createUserURL from '../resolvers/createUserURL';
import deleteUserURL from '../resolvers/deleteUserURL';
import createURL from '../resolvers/createURL';
import createLabel from '../resolvers/createLabel';
import createUserURLLabelForCurrentUser from '../resolvers/createUserURLLabelForCurrentUser';

const Root = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    createURL: {
      name: 'createURL',
      description: 'Create a URL',
      type: URLType,
      args: {
        url: {
          type: GraphQLNonNull(GraphQLString),
        },
      },
      resolve: async (_, args) => createURL(args.url),
    },
    createUserURLForCurrentUser: {
      name: 'createUserURLForCurrentUser',
      description: 'Associate a URL with current user',
      type: UserURLType,
      args: { urlId: { type: GraphQLNonNull(GraphQLID) } },
      resolve: async (_, args, context) => {
        const {
          type,
          id: urlId,
        } = fromGlobalId(args.urlId);
        if (type === 'URL') {
          return createUserURL({
            userId: context.currentUser.id,
            urlId,
          });
        }

        throw new Error('Expected a URL id');
      },
    },
    deleteUserURLForCurrentUser: {
      name: 'deleteUserURLForCurrentUser',
      description: 'Delete a URL associated with current user',
      type: DeleteUserURLForCurrentUserPayloadType,
      args: {
        input: {
          type: GraphQLNonNull(DeleteUserURLForCurrentUserInput),
        },
      },
      resolve: async (_, args) => {
        const {
          type,
          id: userURLId,
        } = fromGlobalId(args.input.userURLId);
        if (type === 'UserURL') {
          await deleteUserURL(userURLId);
          return {
            id: userURLId,
          };
        }

        throw new Error('Expected a UserURL id');
      },
    },
    createLabel: {
      name: 'createLabel',
      description: 'Create a Label',
      type: LabelType,
      args: {
        input: {
          type: GraphQLNonNull(CreateLabelInput),
        },
      },
      resolve: async (_, args) => createLabel(args.input.name),
    },
    createUserURLLabelForCurrentUser: {
      name: 'createUserURLLabelForCurrentUser',
      description: 'Associate specified Label and UserURL',
      type: UserURLLabelType,
      args: {
        input: {
          type: GraphQLNonNull(AddLabelInput),
        },
      },
      resolve: async (_, args, context) => createUserURLLabelForCurrentUser({
        currentUser: context.currentUser,
        args,
      }),
    },
  },
});

export default Root;
