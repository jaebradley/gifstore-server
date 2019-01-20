function up(knex) {
  return knex.raw('CREATE EXTENSION IF NOT EXISTS pg_trgm');
}

function down(knex) {
  return knex.raw('DROP EXTENSION IF EXISTS pg_trgm');
}

module.exports = {
  up,
  down,
};
