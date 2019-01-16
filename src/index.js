import express from 'express';
import expressGraphQL from 'express-graphql';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import expressJWT from 'express-jwt';

import {
  PORT,
  JWT_SECRET,
} from './config';

import api from './routes/api';
import schema from './graphql/schema';
import handleErrors from './middlewares/handleErrors';
import identifyCurrentUser from './middlewares/identifyCurrentUser';

const app = express();

const corsOptions = {
  origin: 'http://localhost:8080',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-gifstore-auth-token', 'x-gifstore-refresh-token'],
};

app.use(logger('combined'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(expressJWT({ secret: JWT_SECRET }).unless({ path: ['/api/google/authentication', '/api/authentication/refresh-credentials'] }));
app.use(identifyCurrentUser.unless({ path: ['/api/google/authentication', '/api/authentication/refresh-credentials'] }));

app.use('/api', api);

app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true,
}));

app.use(handleErrors);
app.listen(PORT);
