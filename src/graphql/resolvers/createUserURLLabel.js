import {
  toGlobalId,
} from 'graphql-relay';
import knex from '../../store/knex';
import {
  create,
} from '../../store/userURLLabels';
import {
  getById as getLabelById,
} from '../../store/labels';
import Label from '../data/nodes/Label';
import LabelEdge from '../data/edges/Label';
import AddLabelToURL from '../data/payloads/AddLabelToURL';

export default async function createUserURLLabel({ userURLId, labelId }) {
  const userURLLabel = await knex.transaction(
    transaction => create({ userURLId, labelId, transaction }),
  );
  const label = await getLabelById(userURLLabel.label_id);
  return AddLabelToURL({
    labelEdge: LabelEdge({
      cursor: toGlobalId('Label', userURLLabel.label_id),
      node: Label(label),
    }),
  });
}
