function up(knex) {
  return knex.schema.createTable('urls', (table) => {
    table.increments('id').primary();
    // https://stackoverflow.com/a/16702812/10039741
    table.string('url', 2083).notNullable();
    table.timestamps(true, true);

    table.unique('url');
    table.index('url');
  });
}

function down(knex) {
  return knex.schema.dropTableIfExists('urls');
}

module.exports = {
  up,
  down,
};
