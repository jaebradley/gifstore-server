import {
  create,
} from '../../store/urls';
import knex from '../../store/knex';
import URL from '../data/nodes/URL';

export default async function createURL(url) {
  return knex.transaction(async (transaction) => {
    const record = await create({
      url,
      transaction,
    });

    return URL(record);
  });
}
