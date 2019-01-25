import knex from '../../store/knex';
import {
  create,
} from '../../store/labels';
import Label from '../data/nodes/Label';

export default async function createLabel(name) {
  const label = await knex.transaction(transaction => create({ name, transaction }));
  return Label(label);
}
