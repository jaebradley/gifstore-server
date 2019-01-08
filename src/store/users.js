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

async function get({ emailAddress }) {
  return knex('users').select(['provider', 'provider_id']).where({ email_address: emailAddress }).first();
}

export {
  create,
  update,
  get,
};
