import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "pgcrypto";');

  await knex.schema.createTable('users', (table) => {
    table
      .uuid('id')
      .primary()
      .defaultTo(knex.raw('gen_random_uuid()'));

    table.string('phone', 20).nullable();
    table.string('email', 255).nullable();
    table.text('password_hash').nullable();
    table.string('type', 20).notNullable();
    table.string('status', 20).notNullable().defaultTo('ACTIVE');
    table.boolean('is_deleted').notNullable().defaultTo(false);
    table.boolean('is_blocked').notNullable().defaultTo(false);
    table.timestamp('last_login_at', { useTz: true }).nullable();
    table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(knex.fn.now());
    table.timestamp('deleted_at', { useTz: true }).nullable();

    table.unique(['phone'], { indexName: 'uq_users_phone' });
    table.unique(['email'], { indexName: 'uq_users_email' });

    table.index(['phone'], 'idx_users_phone');
    table.index(['email'], 'idx_users_email');
    table.index(['type'], 'idx_users_type');
    table.index(['status'], 'idx_users_status');
    table.index(['is_deleted'], 'idx_users_is_deleted');
    table.index(['deleted_at'], 'idx_users_deleted_at');
  });

  await knex.raw(
    `ALTER TABLE users ADD CONSTRAINT ck_users_type CHECK (type IN ('ADMIN', 'PILGRIM'));`,
  );
  await knex.raw(
    `ALTER TABLE users ADD CONSTRAINT ck_users_status CHECK (status IN ('ACTIVE', 'INACTIVE', 'BLOCKED', 'DELETED'));`,
  );

  await knex.schema.createTable('admins', (table) => {
    table
      .uuid('id')
      .primary()
      .defaultTo(knex.raw('gen_random_uuid()'));

    table.uuid('user_id').notNullable();
    table.string('username', 255).notNullable();
    table.string('role', 50).notNullable().defaultTo('STAFF');
    table.string('status', 20).notNullable().defaultTo('ACTIVE');
    table.boolean('is_deleted').notNullable().defaultTo(false);
    table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(knex.fn.now());

    table.unique(['user_id'], { indexName: 'uq_admins_user_id' });
    table.unique(['username'], { indexName: 'uq_admins_username' });

    table
      .foreign('user_id', 'fk_admins_user_id_users_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');

    table.index(['username'], 'idx_admins_username');
    table.index(['status'], 'idx_admins_status');
    table.index(['is_deleted'], 'idx_admins_is_deleted');
  });

  await knex.raw(
    `ALTER TABLE admins ADD CONSTRAINT ck_admins_role CHECK (role IN ('STAFF', 'SUPER_ADMIN'));`,
  );
  await knex.raw(
    `ALTER TABLE admins ADD CONSTRAINT ck_admins_status CHECK (status IN ('ACTIVE', 'INACTIVE', 'DELETED'));`,
  );

  await knex.schema.createTable('pilgrims', (table) => {
    table
      .uuid('id')
      .primary()
      .defaultTo(knex.raw('gen_random_uuid()'));

    table.uuid('user_id').notNullable();
    table.string('full_name', 255).nullable();
    table.uuid('country_id').notNullable();
    table.date('birth_date').nullable();
    table.string('passport_number', 100).nullable();
    table.boolean('is_guide').notNullable().defaultTo(false);
    table.string('status', 20).notNullable().defaultTo('ACTIVE');
    table.boolean('is_deleted').notNullable().defaultTo(false);
    table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(knex.fn.now());

    table.unique(['user_id'], { indexName: 'uq_pilgrims_user_id' });

    table
      .foreign('user_id', 'fk_pilgrims_user_id_users_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');

    table.index(['country_id'], 'idx_pilgrims_country_id');
    table.index(['passport_number'], 'idx_pilgrims_passport_number');
    table.index(['status'], 'idx_pilgrims_status');
    table.index(['is_deleted'], 'idx_pilgrims_is_deleted');
  });

  await knex.raw(
    `ALTER TABLE pilgrims ADD CONSTRAINT ck_pilgrims_status CHECK (status IN ('ACTIVE', 'INACTIVE', 'DELETED'));`,
  );

  await knex.schema.createTable('otp_sessions', (table) => {
    table
      .uuid('id')
      .primary()
      .defaultTo(knex.raw('gen_random_uuid()'));

    table.string('phone', 20).notNullable();
    table.string('code', 10).notNullable();
    table.string('method', 20).notNullable();
    table.integer('attempts').notNullable().defaultTo(0);
    table.boolean('is_used').notNullable().defaultTo(false);
    table.string('status', 20).notNullable().defaultTo('PENDING');
    table.boolean('is_deleted').notNullable().defaultTo(false);
    table.timestamp('expires_at', { useTz: true }).notNullable();
    table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(knex.fn.now());

    table.index(['phone'], 'idx_otp_sessions_phone');
    table.index(['expires_at'], 'idx_otp_sessions_expires_at');
    table.index(['status'], 'idx_otp_sessions_status');
    table.index(['is_deleted'], 'idx_otp_sessions_is_deleted');
  });

  await knex.raw(
    `ALTER TABLE otp_sessions ADD CONSTRAINT ck_otp_sessions_method CHECK (method IN ('SMS', 'TELEGRAM'));`,
  );
  await knex.raw(
    `ALTER TABLE otp_sessions ADD CONSTRAINT ck_otp_sessions_attempts_non_negative CHECK (attempts >= 0);`,
  );
  await knex.raw(
    `ALTER TABLE otp_sessions ADD CONSTRAINT ck_otp_sessions_status CHECK (status IN ('PENDING', 'VERIFIED', 'EXPIRED', 'USED'));`,
  );

  // ---------------------------------------------------------- refresh_tokens
  await knex.schema.createTable('refresh_tokens', (table) => {
    table
      .uuid('id')
      .primary()
      .defaultTo(knex.raw('gen_random_uuid()'));

    table.uuid('user_id').notNullable();
    table.text('token').notNullable();
    table.boolean('is_revoked').notNullable().defaultTo(false);
    table.string('status', 20).notNullable().defaultTo('ACTIVE');
    table.boolean('is_deleted').notNullable().defaultTo(false);
    table.timestamp('expires_at', { useTz: true }).notNullable();
    table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(knex.fn.now());

    table
      .foreign('user_id', 'fk_refresh_tokens_user_id_users_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');

    table.index(['user_id'], 'idx_refresh_tokens_user_id');
    table.index(['expires_at'], 'idx_refresh_tokens_expires_at');
    table.index(['status'], 'idx_refresh_tokens_status');
    table.index(['is_deleted'], 'idx_refresh_tokens_is_deleted');
  });

  await knex.raw(
    `ALTER TABLE refresh_tokens ADD CONSTRAINT ck_refresh_tokens_status CHECK (status IN ('ACTIVE', 'REVOKED', 'EXPIRED'));`,
  );
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('refresh_tokens');
  await knex.schema.dropTableIfExists('otp_sessions');
  await knex.schema.dropTableIfExists('pilgrims');
  await knex.schema.dropTableIfExists('admins');
  await knex.schema.dropTableIfExists('users');
}
