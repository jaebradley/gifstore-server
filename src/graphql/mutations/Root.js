import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
} from 'graphql';
import {
  fromGlobalId,
} from 'graphql-relay';
import URLType from '../types/URL';
import DeleteURLForCurrentUserPayloadType from '../types/DeleteURLForCurrentUser';
import LabelType from '../types/Label';
import UserURLLabelType from '../types/UserURLLabel';
import AddLabelInput from '../types/inputs/AddLabel';
import DeleteURLForCurrentUserInputType from '../types/inputs/DeleteURLForCurrentUser';
import CreateURLInputType from '../types/inputs/CreateURL';
import CreateCurrentUserURLInputType from '../types/inputs/CreateCurrentUserURL';
import CreateUserURLPayload from '../types/payloads/CreateUserURL';
import AddLabelToURLPayload from '../types/payloads/AddLabelToURL';
import CreateLabelInput from '../types/inputs/CreateLabel';
import createUserURL from '../resolvers/createUserURL';
import deleteUserURL from '../resolvers/deleteUserURL';
import createURL from '../resolvers/createURL';
import createLabel from '../resolvers/createLabel';
import addLabelToURLForCurrentUser from '../resolvers/addLabelToURLForCurrentUser';

const Root = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    createURL: {
      name: 'createURL',
      description: 'Create a URL',
      type: URLType,
      args: {
        input: {
          type: GraphQLNonNull(CreateURLInputType),
        },
      },
      resolve: async (_, args) => createURL(args.input.url),
    },
    createURLForCurrentUser: {
      name: 'createURLForCurrentUser',
      description: 'Associate a URL with current user',
      type: CreateUserURLPayload,
      args: {
        input: {
          type: GraphQLNonNull(CreateCurrentUserURLInputType),
        },
      },
      resolve: async (_, args, context) => {
        const {
          type,
          id: urlId,
        } = fromGlobalId(args.input.urlId);
        if (type === 'URL') {
          return createUserURL({
            userId: context.currentUser.id,
            urlId,
          });
        }

        throw new Error('Expected a URL id');
      },
    },
    deleteURLForCurrentUser: {
      name: 'deleteURLForCurrentUser',
      description: 'Delete a URL associated with the Current User',
      type: DeleteURLForCurrentUserPayloadType,
      args: {
        input: {
          type: GraphQLNonNull(DeleteURLForCurrentUserInputType),
        },
      },
      resolve: async (_, args) => {
        const {
          type,
          id: urlId,
        } = fromGlobalId(args.input.urlId);
        if (type === 'URL') {
          return deleteUserURL(urlId);
        }

        throw new Error('Expected a URL id');
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
    addLabelToURLForCurrentUser: {
      name: 'addLabelToURLForCurrentUser',
      description: 'Associate specified Label and UserURL',
      type: AddLabelToURLPayload,
      args: {
        input: {
          type: GraphQLNonNull(AddLabelInput),
        },
      },
      resolve: async (_, args, context) => addLabelToURLForCurrentUser({
        currentUser: context.currentUser,
        args,
      }),
    },
  },
});

export default Root;
