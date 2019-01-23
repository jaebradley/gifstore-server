import knex from './knex';

const TABLE_NAME = 'urls';
const ROWS = ['id', 'url', 'created_at', 'updated_at'];

async function create({ url, transaction }) {
  const rows = await knex(TABLE_NAME).returning(ROWS).insert({ url }).transacting(transaction);
  return rows[0];
}

async function getByIds(ids) {
  return knex(TABLE_NAME).select(ROWS).whereIn('id', ids);
}

async function getById(id) {
  return knex(TABLE_NAME).select(ROWS).where('id', id).first();
}

async function getByURLs(urls) {
  return knex(TABLE_NAME).select(ROWS).whereIn('url', urls);
}

async function getByURL(url) {
  return knex(TABLE_NAME).select(ROWS).where('url', url).first();
}

export {
  create,
  getById,
  getByIds,
  getByURL,
  getByURLs,
};
