import type { Knex } from 'knex';

exports.up = async function (knex: Knex) {
  return knex.schema.alterTable('countries', (table) => {
    table.renameColumn('code', 'soato');
  });
};

exports.down = async function (knex: Knex) {
  return knex.schema.alterTable('countries', (table) => {
    table.renameColumn('soato', 'code');
  });
};
