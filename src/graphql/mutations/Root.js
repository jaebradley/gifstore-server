import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
} from 'graphql';
import {
  fromGlobalId,
} from 'graphql-relay';
import {
  getByURL,
} from '../../store/urls';
import {
  get as getUserURL,
} from '../../store/userURLs';
import URLType from '../types/URL';
import UserURLType from '../types/UserURL';
import DeleteUserURLForCurrentUserPayloadType from '../types/DeleteUserURLForCurrentUserPayload';
import URL from '../data/nodes/URL';
import Label from '../data/nodes/Label';
import AddLabelInput from '../inputs/AddLabel';
import DeleteUserURLForCurrentUserInput from '../inputs/DeleteUserURLForCurrentUser';
import {
  create as createLabel,
  getByName as getLabelByName,
  getByIds as getLabelsByIds,
} from '../../store/labels';
import {
  create as createUserURLLabel,
  getAllForUserURL as getAllUserURLLabelsForUserURL,
} from '../../store/userURLLabels';
import createUserURL from '../resolvers/createUserURL';
import deleteUserURL from '../resolvers/deleteUserURL';
import createURL from '../resolvers/createURL';

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
    addLabelToURLForCurrentUser: {
      name: 'Add label to URL',
      description: 'Add label to specified URL fro current user',
      type: URLType,
      args: {
        input: {
          type: GraphQLNonNull(AddLabelInput),
        },
      },
      resolve: async (_, args, context) => {
        const userId = context.currentUser.id;
        const url = await getByURL(args.input.url);
        if (!url) {
          throw new Error(`URL ${args.input.url} does not exist`);
        }
        const userURL = await getUserURL({ userId, urlId: url.id });
        if (!userURL) {
          throw new Error('User does not have URL');
        }
        let label = await getLabelByName(args.input.name);
        if (!label) {
          label = await createLabel({ name: args.input.name });
        }
        await createUserURLLabel({ userURLId: userURL.id, labelId: label.id });
        const userURLLabels = await getAllUserURLLabelsForUserURL(userURL.id);
        const labelIds = userURLLabels.map(uul => uul.label_id);
        const labels = await getLabelsByIds(labelIds);
        return URL({
          ...url,
          labels: labels.map(l => Label(l)),
        });
      },
    },
  },
});

export default Root;
