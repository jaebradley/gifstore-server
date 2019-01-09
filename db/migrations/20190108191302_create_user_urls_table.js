function up(knex) {
  return knex.schema.createTable('user_urls', (table) => {
    table.increments('id').primary();
    table.bigInteger('user_id').notNullable();
    table.bigInteger('url_id').notNullable();
    table.timestamps(true, true);

    table
      .foreign('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table
      .foreign('url_id')
      .references('id')
      .inTable('urls')
      .onDelete('CASCADE');

    table.unique(['user_id', 'url_id']);
    table.index(['user_id', 'url_id']);
  });
}

function down(knex) {
  return knex.schema.dropTableIfExists('user_urls');
}

module.exports = {
  up,
  down,
};
