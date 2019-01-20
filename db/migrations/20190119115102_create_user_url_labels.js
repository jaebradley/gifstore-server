const TABLE_NAME = 'user_url_labels';

function up(knex) {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments('id').primary();
    table.bigInteger('user_url_id').notNullable();
    table.string('label').notNullable();
    table.timestamps(true, true);

    table
      .foreign('user_url_id')
      .references('id')
      .inTable('user_urls')
      .onDelete('CASCADE');

    table.unique(['user_url_id', 'label']);
    table.index(['user_url_id', 'label']);
    table.index('label', 'GIN');
  });
}

function down(knex) {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}

module.exports = {
  up,
  down,
};
