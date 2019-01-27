import knex from 'knex';

import knexfile from '../../knexfile';
import {
  ENVIRONMENT,
} from '../config';

console.log('environment', ENVIRONMENT);

const configuration = knexfile[ENVIRONMENT];

export default knex(configuration);
