function up(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('email_address').notNullable();
    table.string('provider').notNullable();
    table.string('provider_id').notNullable();
    table.timestamps(true, true);

    table.unique('email_address');
    table.unique(['provider', 'provider_id']);

    table.index('email_address');
    table.index(['provider', 'provider_id']);
  });
}

function down(knex) {
  return knex.schema.dropTableIfExists('users');
}

module.exports = {
  up,
  down,
};
