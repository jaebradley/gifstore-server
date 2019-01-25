import knex from './knex';

const TABLE_NAME = 'user_url_labels';
const ROWS = ['id', 'user_url_id', 'label_id', 'created_at', 'updated_at'];

async function create({ userURLId, labelId, transaction }) {
  const rows = await knex(TABLE_NAME)
    .returning(ROWS)
    .insert({ user_url_id: userURLId, label_id: labelId })
    .transacting(transaction);
  return rows[0];
}

async function getAllForUserURL(userURLId) {
  return knex(TABLE_NAME).select(ROWS).where('user_url_id', userURLId);
}

async function getAllForUserURLs(userURLIds) {
  return knex(TABLE_NAME).select(ROWS).whereIn('user_url_id', userURLIds);
}

async function getById(id) {
  return knex(TABLE_NAME).select(ROWS).where('id', id);
}

export {
  create,
  getAllForUserURL,
  getAllForUserURLs,
  getById,
};
