import type { Knex } from 'knex';

exports.up = async function (knex: Knex) {
  await knex.schema.alterTable('pilgrims', (table) => {
    table.dropColumn('full_name');
    table.string('first_name', 255).notNullable().defaultTo('');
    table.string('last_name', 255).nullable();
    table.string('middle_name', 255).nullable();

    table.foreign('country_id').references('countries.id').onDelete('SET NULL');
    table.foreign('region_id').references('regions.id').onDelete('SET NULL');
    table.foreign('district_id').references('districts.id').onDelete('SET NULL');
  });

  await knex.schema.alterTable('agencies', (table) => {
    table.dropColumn('country');
    table.uuid('country_id').nullable();
    table.foreign('country_id').references('countries.id').onDelete('SET NULL');
  });
};

exports.down = async function (knex: Knex) {
  await knex.schema.alterTable('agencies', (table) => {
    table.dropForeign(['country_id']);
    table.dropColumn('country_id');
    table.string('country', 255).nullable();
  });

  await knex.schema.alterTable('pilgrims', (table) => {
    table.dropForeign(['country_id']);
    table.dropForeign(['region_id']);
    table.dropForeign(['district_id']);
    table.dropColumn('first_name');
    table.dropColumn('last_name');
    table.dropColumn('middle_name');
    table.string('full_name', 255).notNullable().defaultTo('');
  });
};
