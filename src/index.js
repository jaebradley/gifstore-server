import express from 'express';
import expressGraphQL from 'express-graphql';

import {
  PORT,
} from './config';

import api from './routes/api';
import schema from './graphql/schema';

const app = express();

// Default for now
const root = {
  message: () => 'Hello World!',
};

app.use('/api', api);

app.use('/graphql', expressGraphQL({
  schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(PORT);
