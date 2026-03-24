import type { Knex } from 'knex';

exports.up = async function (knex: Knex) {
  return knex.schema.alterTable('users', (table) => {
    table.timestamp('last_login_at').nullable();
  });
};

exports.down = async function (knex: Knex) {
  return knex.schema.alterTable('users', (table) => {
    table.dropColumn('last_login_at');
  });
};
