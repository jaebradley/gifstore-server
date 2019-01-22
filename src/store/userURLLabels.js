import knex from './knex';

const TABLE_NAME = 'user_url_labels';
const ROWS = ['id', 'user_url_id', 'label_id', 'created_at', 'updated_at'];

async function create({ userURLId, labelId }) {
  return knex(TABLE_NAME).insert({ user_url_id: userURLId, label_id: labelId });
}

async function getAllForUserURL(userURLId) {
  return knex(TABLE_NAME).select(ROWS).where('user_url_id', userURLId);
}

async function getAllForUserURLs(userURLIds) {
  return knex(TABLE_NAME).select(ROWS).whereIn('user_url_id', userURLIds);
}

export {
  create,
  getAllForUserURL,
  getAllForUserURLs,
};
