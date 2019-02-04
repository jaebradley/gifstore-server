import lodash from 'lodash';

import knex from './knex';
import {
  TABLE_NAME as URLS_TABLE_NAME,
} from './urls';

const TABLE_NAME = 'user_urls';
const ROWS = ['id', 'user_id', 'url_id', 'created_at', 'updated_at'];

async function create({ userId, urlId, transaction }) {
  const rows = await knex(TABLE_NAME)
    .returning(ROWS)
    .insert({ user_id: userId, url_id: urlId })
    .transacting(transaction);
  return rows[0];
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

async function getAll({
  userId,
  orderField,
  orderDirection,
  afterId = null,
  beforeId = null,
  limit = 10,
}) {
  const rows = [
    `${TABLE_NAME}.id`,
    `${TABLE_NAME}.user_id`,
    `${TABLE_NAME}.url_id`,
    `${TABLE_NAME}.created_at`,
    `${TABLE_NAME}.updated_at`,
    `${URLS_TABLE_NAME}.url`,
  ];
  const query = knex
    .select(rows)
    .from(TABLE_NAME)
    .innerJoin(URLS_TABLE_NAME, `${TABLE_NAME}.url_id`, `${URLS_TABLE_NAME}.id`)
    .where(`${TABLE_NAME}.user_id`, userId)
    .orderBy(orderField, orderDirection);

  if (!lodash.isNil(afterId)) {
    query.where(`${TABLE_NAME}.id`, '>', afterId);
  }

  if (!lodash.isNil(beforeId)) {
    query.where(`${TABLE_NAME}.id`, '<', beforeId);
  }

  if (!lodash.isNil(limit)) {
    query.limit(limit);
  }

  return query;
}

async function del({ id, transaction }) {
  return knex(TABLE_NAME).where({ id }).del().transacting(transaction);
}

async function deleteForUserAndURL({ userId, urlId, transaction }) {
  return knex(TABLE_NAME).where({ user_id: userId, url_id: urlId }).del().transacting(transaction);
}

async function getById(id) {
  return knex(TABLE_NAME).where({ id }).first();
}

export {
  create,
  del,
  deleteForUserAndURL,
  get,
  getAll,
  getAllForUserId,
  getAllForURLId,
  getById,
};
