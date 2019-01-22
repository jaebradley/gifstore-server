const LABEL_TABLE_NAME = require('./20190119114016_create_labels').TABLE_NAME;

const TABLE_NAME = 'user_url_labels';

function up(knex) {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments('id').primary();
    table.bigInteger('user_url_id').notNullable();
    table.bigInteger('label_id').notNullable();
    table.timestamps(true, true);

    table
      .foreign('user_url_id')
      .references('id')
      .inTable('user_urls')
      .onDelete('CASCADE');

    table
      .foreign('label_id')
      .references('id')
      .inTable(LABEL_TABLE_NAME)
      .onDelete('CASCADE');

    table.unique(['user_url_id', 'label_id']);
    table.index(['user_url_id', 'label_id']);
  });
}

function down(knex) {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}

module.exports = {
  up,
  down,
  TABLE_NAME,
};
