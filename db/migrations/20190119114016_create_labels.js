const TABLE_NAME = 'labels';

function up(knex) {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.timestamps(true, true);

    table.index('name', 'GIN');
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
