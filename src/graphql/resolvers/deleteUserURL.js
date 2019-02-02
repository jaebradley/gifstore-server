import {
  deleteForUserAndURL,
} from '../../store/userURLs';
import knex from '../../store/knex';
import DeleteUserURL from '../data/payloads/DeleteUserURL';

export default async function deleteUserURL({ userId, urlId }) {
  await knex.transaction(async transaction => (
    deleteForUserAndURL({
      userId,
      urlId,
      transaction,
    })
  ));
  return DeleteUserURL({ urlId });
}
