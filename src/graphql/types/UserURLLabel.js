import {
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';
import {
  globalIdField,
} from 'graphql-relay';

import UserURLType from './UserURL';
import LabelType from './Label';
import { nodeInterface } from '../NodeDefinitions';

const UserURLLabel = new GraphQLObjectType({
  name: 'UserURLLabel',
  description: 'The association between a UserURL and a Label',
  interfaces: () => [nodeInterface],
  fields: {
    id: globalIdField('UserURLLabel'),
    label: {
      type: GraphQLNonNull(LabelType),
    },
  },
});

export default UserURLLabel;
