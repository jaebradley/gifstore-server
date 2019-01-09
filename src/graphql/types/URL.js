import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import {
  globalIdField,
} from 'graphql-relay';


const URL = new GraphQLObjectType({
  name: 'URL',
  fields: {
    id: globalIdField('URL'),
    url: {
      type: GraphQLString,
    },
  },
});

export default URL;
