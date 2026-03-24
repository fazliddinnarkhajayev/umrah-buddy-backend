import type { Knex } from 'knex';

exports.up = async function (knex: Knex) {
  return knex.schema.createTable('admins', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('phone', 20).notNullable();
    table.string('username', 255).notNullable().unique();
    table.string('first_name', 255).notNullable();
    table.string('last_name', 255).nullable();
    table.string('middle_name', 255).nullable();
    table.string('role', 50).notNullable();
    table.uuid('user_id').notNullable().unique();
    table.string('status', 50).notNullable().defaultTo('CREATED');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.uuid('created_by_id').nullable();
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.uuid('updated_by_id').nullable();
    table.boolean('is_deleted').defaultTo(false);
    
    // Foreign key constraint
    table.foreign('user_id').references('users.id').onDelete('RESTRICT');
  });
};

exports.down = async function (knex: Knex) {
  return knex.schema.dropTable('admins');
};
