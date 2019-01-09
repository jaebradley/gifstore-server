import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
} from 'graphql';

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
} from '../../store/userURLs';
import URLType from '../types/URL';
import URL from '../../data/URL';

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
        return URL(url);
      },
    },
  },
});

export default Root;
