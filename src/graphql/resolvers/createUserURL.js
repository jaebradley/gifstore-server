import {
  toGlobalId,
} from 'graphql-relay';
import {
  create,
} from '../../store/userURLs';
import knex from '../../store/knex';
import {
  getById as getURLById,
} from '../../store/urls';
import URL from '../data/nodes/URL';
import URLEdge from '../data/edges/URL';
import CreateUserURL from '../data/payloads/CreateUserURL';

export default async function createUserURL({ userId, urlId }) {
  await knex.transaction(async transaction => (
    create({
      userId,
      urlId,
      transaction,
    })
  ));
  const urlRecord = await getURLById(urlId);
  return CreateUserURL({
    urlEdge: URLEdge({
      // TODO: @jaebradley adjust this cursor calculation but for now
      // use the id as the cursor - I don't think it really matters
      // for a single value edge?
      cursor: toGlobalId('URL', urlRecord.id),
      node: URL({
        id: Number(urlRecord.id),
        url: urlRecord.url,
      }),
    }),
  });
}
