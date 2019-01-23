import knex from '../../store/knex';
import {
  create,
} from '../../store/userURLLabels';
import getUserURLLabel from '../data/getURLLabels';


export default async function createUserURLLabel({ userURLId, labelId }) {
  const userURLLabel = await knex.transaction(
    transaction => create({ userURLId, labelId, transaction }),
  );
  return getUserURLLabel(userURLLabel.id);
}
