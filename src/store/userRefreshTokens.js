import bcrypt from 'bcrypt';

import knex from './knex';

const TABLE_NAME = 'user_refresh_tokens';
const ROWS = ['id', 'user_id', 'refresh_token'];

async function create({ userId, refreshToken }) {
  const encryptedRefreshToken = await bcrypt.hash(refreshToken, 10);
  const rows = await knex(TABLE_NAME).insert({
    user_id: userId,
    refresh_token: encryptedRefreshToken,
  }).returning(ROWS);
  return rows[0];
}

async function getLast({ userId }) {
  return knex(TABLE_NAME)
    .select(ROWS)
    .where('user_id', userId)
    .orderBy('id', 'desc')
    .first();
}

export {
  create,
  getLast,
};
