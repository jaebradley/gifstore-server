import knex from './knex';

const TABLE_NAME = 'labels';
const ROWS = ['id', 'name', 'created_at', 'updated_at'];

async function create({ name, transaction }) {
  const rows = await knex(TABLE_NAME).returning(ROWS).insert({ name }).transacting(transaction);
  return rows[0];
}

async function search({ term, ids }) {
  return knex(TABLE_NAME).select(ROWS).whereIn('id', ids).where('name', 'like', `%${term}%`);
}

async function getById(id) {
  return knex(TABLE_NAME).select(ROWS).where({ id }).first();
}

async function getByName(name) {
  return knex(TABLE_NAME).select(ROWS).where({ name }).first();
}

async function getByIds(ids) {
  return knex(TABLE_NAME).select(ROWS).whereIn('id', ids);
}

export {
  create,
  search,
  getById,
  getByName,
  getByIds,
};
