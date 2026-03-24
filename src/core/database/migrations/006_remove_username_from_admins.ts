import type { Knex } from 'knex';

exports.up = async function (knex: Knex) {
  return knex.schema.alterTable('admins', (table) => {
    table.dropUnique(['username']);
    table.dropColumn('username');
  });
};

exports.down = async function (knex: Knex) {
  return knex.schema.alterTable('admins', (table) => {
    table.string('username', 255).notNullable().unique();
  });
};
