import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
} from 'graphql';
import {
  List,
} from 'immutable';

import {
  getById,
} from '../../store/users';
import {
  create as createURL,
  getByURL,
} from '../../store/urls';
import {
  get as getUserURL,
  create as createUserURL,
  del as deleteUserURL,
} from '../../store/userURLs';
import URLType from '../types/URL';
import URL from '../data/nodes/URL';
import Label from '../data/nodes/Label';
import AddLabelInput from '../inputs/AddLabel';
import {
  create as createLabel,
  getByName as getLabelByName,
  getByIds as getLabelsByIds,
} from '../../store/labels';
import {
  create as createUserURLLabel,
  getAllForUserURL as getAllUserURLLabelsForUserURL,
} from '../../store/userURLLabels';

const Root = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    AddURL: {
      name: 'Add URL for current user',
      description: 'Associate a URL with current user',
      type: URLType,
      args: { url: { type: GraphQLNonNull(GraphQLString) } },
      resolve: async (_, args, context) => {
        // TODO: @jaebradley wrap this in a transaction
        const user = await getById(context.currentUser.id);
        let url = await getByURL(args.url);
        if (!url) {
          url = await createURL(args.url);
        }
        const userUrl = await getUserURL({ userId: user.id, urlId: url.id });
        if (!userUrl) {
          await createUserURL({ userId: user.id, urlId: url.id });
        }
        const labels = await getAllUserURLLabelsForUserURL(userUrl.id);
        return URL({
          ...url,
          labels: List(labels.map(label => Label(label))),
        });
      },
    },
    DeleteURL: {
      name: 'DeleteURL',
      description: 'Delete a URL associated with current user',
      type: URLType,
      args: { url: { type: GraphQLNonNull(GraphQLString) } },
      resolve: async (_, args, context) => {
        const userId = context.currentUser.id;
        const url = await getByURL(args.url);
        if (!url) {
          throw new Error(`URL ${args.url} does not exist`);
        }
        await deleteUserURL({ userId, urlId: url.id });
        return URL(url);
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
