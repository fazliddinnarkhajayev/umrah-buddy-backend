import type { Knex } from 'knex';

exports.up = async function (knex: Knex) {
  return knex.schema.createTable('users', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('username', 255).notNullable().unique();
    table.string('password_hash', 255).nullable();
    table.string('type', 50).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.uuid('created_by_id').nullable();
  });
};

exports.down = async function (knex: Knex) {
  return knex.schema.dropTable('users');
};
