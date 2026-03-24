import type { Knex } from 'knex';

exports.up = async function (knex: Knex) {
  return knex.schema.table('districts', (table) => {
    table.uuid('region_id').notNullable();
    table.foreign('region_id').references('regions.id').onDelete('RESTRICT');
  });
};

exports.down = async function (knex: Knex) {
  return knex.schema.table('districts', (table) => {
    table.dropForeign(['region_id']);
    table.dropColumn('region_id');
  });
};
