import type { Knex } from 'knex';

exports.up = async function (knex: Knex) {
  return knex.schema.createTable('pilgrims', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('full_name', 255).notNullable();
    table.string('phone', 20).nullable();
    table.string('email', 255).nullable();
    table.uuid('country_id').nullable();
    table.uuid('region_id').nullable();
    table.uuid('district_id').nullable();
    table.uuid('user_id').notNullable().unique();
    table.string('status', 50).notNullable().defaultTo('ACTIVE');
    table.boolean('is_blocked').defaultTo(false);
    table.timestamp('blocked_at').nullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.uuid('created_by_id').nullable();
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.uuid('updated_by_id').nullable();
    table.boolean('is_deleted').defaultTo(false);

    table.foreign('user_id').references('users.id').onDelete('RESTRICT');
  });
};

exports.down = async function (knex: Knex) {
  return knex.schema.dropTable('pilgrims');
};
