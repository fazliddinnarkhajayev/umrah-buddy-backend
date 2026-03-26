import type { Knex } from 'knex';

exports.up = async function (knex: Knex) {
  return knex.schema.createTable('agencies', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('name', 255).notNullable();
    table.string('phone', 20).notNullable();
    table.string('email', 255).nullable();
    table.string('address', 500).nullable();
    table.string('country', 255).nullable();
    table.uuid('region_id').nullable();
    table.uuid('district_id').nullable();
    table.string('status', 50).notNullable().defaultTo('PENDING');
    table.string('license_number', 100).nullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.uuid('created_by_id').nullable();
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.uuid('updated_by_id').nullable();
    table.boolean('is_deleted').defaultTo(false);

    table.foreign('region_id').references('regions.id').onDelete('SET NULL');
    table.foreign('district_id').references('districts.id').onDelete('SET NULL');
  });
};

exports.down = async function (knex: Knex) {
  return knex.schema.dropTable('agencies');
};
