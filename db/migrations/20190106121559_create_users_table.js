function up(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('username').notNullable();
    table.string('email_address').notNullable();
    table.string('password').notNullable();
    table.timestamps(true, true);
  });
}

function down(knex) {
  return knex.schema.dropTableIfExists('user');
}

module.exports = {
  up,
  down,
};
