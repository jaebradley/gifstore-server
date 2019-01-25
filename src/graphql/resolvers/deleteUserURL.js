import {
  del,
} from '../../store/userURLs';
import knex from '../../store/knex';
import DeleteUserURL from '../data/payloads/DeleteUserURL';

export default async function deleteUserURL(id) {
  await knex.transaction(async transaction => (
    del({
      id,
      transaction,
    })
  ));
  return DeleteUserURL({ id });
}
