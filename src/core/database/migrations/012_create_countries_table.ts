import type { Knex } from 'knex';

exports.up = async function (knex: Knex) {
  return knex.schema.createTable('countries', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('name', 255).notNullable();
    table.string('code', 10).nullable().unique();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.uuid('created_by_id').nullable();
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.uuid('updated_by_id').nullable();
    table.boolean('is_deleted').defaultTo(false);
  });
};

exports.down = async function (knex: Knex) {
  return knex.schema.dropTable('countries');
};
