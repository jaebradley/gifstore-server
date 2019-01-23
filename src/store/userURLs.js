import knex from './knex';

const TABLE_NAME = 'user_urls';
const ROWS = ['id', 'user_id', 'url_id', 'created_at', 'updated_at'];

async function create({ userId, urlId }) {
  return knex(TABLE_NAME).insert({ user_id: userId, url_id: urlId });
}

async function get({ userId, urlId }) {
  return knex(TABLE_NAME).select(ROWS).where({ user_id: userId, url_id: urlId }).first();
}

async function getAllForUserId(userId) {
  return knex(TABLE_NAME).select(ROWS).where({ user_id: userId });
}

async function getAllForURLId(urlId) {
  return knex(TABLE_NAME).select(ROWS).where({ url_id: urlId });
}

async function del({ userId, urlId }) {
  return knex(TABLE_NAME).where({ user_id: userId, url_id: urlId }).del();
}

async function getById(id) {
  return knex(TABLE_NAME).where({ id }).first();
}

export {
  create,
  del,
  get,
  getAllForUserId,
  getAllForURLId,
  getById,
};
