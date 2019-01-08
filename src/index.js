import express from 'express';
import expressGraphQL from 'express-graphql';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

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

const corsOptions = {
  origin: 'http://localhost:8080',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-gifstore-auth-token'],
};

app.use(logger());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(corsOptions));

app.use('/api', api);

app.use('/graphql', expressGraphQL({
  schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(PORT);
