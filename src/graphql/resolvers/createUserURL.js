import {
  create,
} from '../../store/userURLs';
import knex from '../../store/knex';
import getUserURL from '../data/getUserURL';

export default async function createUserURL({ userId, urlId }) {
  const userURL = await knex.transaction(async transaction => (
    create({
      userId,
      urlId,
      transaction,
    })
  ));
  return getUserURL(userURL.id);
}
