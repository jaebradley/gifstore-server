function up(knex) {
  return knex.schema.createTable('user_refresh_tokens', (table) => {
    table.increments('id').primary();
    table.bigInteger('user_id').notNullable();
    table.text('refresh_token').notNullable();
    table.timestamps(true, true);

    table
      .foreign('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');

    table.unique(['refresh_token']);
    table.index(['user_id', 'refresh_token']);
  });
}

function down(knex) {
  return knex.schema.dropTableIfExists('user_refresh_tokens');
}

module.exports = {
  up,
  down,
};
