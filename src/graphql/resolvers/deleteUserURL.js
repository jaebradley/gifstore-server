import {
  del,
} from '../../store/userURLs';
import knex from '../../store/knex';

export default async function deleteUserURL(id) {
  return knex.transaction(async transaction => (
    del({
      id,
      transaction,
    })
  ));
}
