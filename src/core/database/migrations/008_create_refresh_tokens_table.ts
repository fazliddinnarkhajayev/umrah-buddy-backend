import type { Knex } from 'knex';

exports.up = async function (knex: Knex) {
  return knex.schema.createTable('refresh_tokens', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('user_id').notNullable();
    table.text('token').notNullable();
    table.boolean('is_revoked').notNullable().defaultTo(false);
    table.string('status', 50).notNullable().defaultTo('ACTIVE');
    table.boolean('is_deleted').notNullable().defaultTo(false);
    table.timestamp('expires_at').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());

    table.foreign('user_id').references('users.id').onDelete('CASCADE');
    table.index(['token']);
    table.index(['user_id']);
  });
};

exports.down = async function (knex: Knex) {
  return knex.schema.dropTable('refresh_tokens');
};
