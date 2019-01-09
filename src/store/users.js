import knex from './knex';

async function create({ emailAddress, provider, providerId }) {
  return knex('users').insert({
    email_address: emailAddress,
    provider,
    provider_id: providerId,
  });
}

async function update({ emailAddress, provider, providerId }) {
  return knex('users').update({
    email_address: emailAddress,
    provider,
    provider_id: providerId,
  });
}

async function get({ provider, providerId }) {
  return knex('users').select(['id', 'email_address', 'provider', 'provider_id']).where({ provider, provider_id: providerId }).first();
}

async function getById(id) {
  return knex('users').select(['id', 'email_address']).where('id', id).first();
}

export {
  create,
  update,
  get,
  getById,
};
