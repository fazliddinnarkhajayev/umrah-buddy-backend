import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { KNEX_CONNECTION } from '../../core/database/database.constants';

export type UserRole = 'PILGRIM' | 'STAFF' | 'SUPER_ADMIN';
export type RegisterType = 'MANUAL' | 'GOOGLE' | 'OTP';

export interface SharedUserRecord {
  id: string;
  phone: string;
  password_hash: string | null;
  role: UserRole;
  register_type: RegisterType;
  blocked_at: Date | null;
  deleted_at: Date | null;
  first_name: string | null;
  last_name: string | null;
  middle_name: string | null;
  region: string | null;
  district: string | null;
  language: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface FindUsersFilter {
  role?: UserRole;
  roles?: UserRole[];
  includeDeleted?: boolean;
}

@Injectable()
export class UsersDao {
  constructor(@Inject(KNEX_CONNECTION) private readonly db: Knex) { }

  async findByPhone(phone: string, includeDeleted = false): Promise<SharedUserRecord | undefined> {
    const query = this.db<SharedUserRecord>('users').where({ phone });

    if (!includeDeleted) {
      query.whereNull('deleted_at');
    }

    return query.first();
  }

  async findById(id: string, includeDeleted = false): Promise<SharedUserRecord | undefined> {
    const query = this.db<SharedUserRecord>('users').where({ id });

    if (!includeDeleted) {
      query.whereNull('deleted_at');
    }

    return query.first();
  }

  async findMany(filter: FindUsersFilter = {}): Promise<SharedUserRecord[]> {
    const query = this.db<SharedUserRecord>('users').orderBy('created_at', 'desc');

    if (!filter.includeDeleted) {
      query.whereNull('deleted_at');
    }

    if (filter.role) {
      query.where({ role: filter.role });
    }

    if (filter.roles?.length) {
      query.whereIn('role', filter.roles);
    }

    return query;
  }

  async insert(payload: Partial<SharedUserRecord>): Promise<SharedUserRecord> {
    const [record] = await this.db<SharedUserRecord>('users').insert(payload).returning('*');
    return record;
  }

  async updateById(id: string, payload: Partial<SharedUserRecord>): Promise<SharedUserRecord | undefined> {
    const [record] = await this.db<SharedUserRecord>('users')
      .where({ id })
      .whereNull('deleted_at')
      .update(payload)
      .returning('*');

    return record;
  }

  async softDeleteById(id: string): Promise<boolean> {
    const affected = await this.db<SharedUserRecord>('users')
      .where({ id })
      .whereNull('deleted_at')
      .update({
        deleted_at: this.db.fn.now() as unknown as Date,
        updated_at: this.db.fn.now() as unknown as Date,
      });

    return affected > 0;
  }

  async setBlockedById(id: string, blocked: boolean): Promise<SharedUserRecord | undefined> {
    const [record] = await this.db<SharedUserRecord>('users')
      .where({ id })
      .whereNull('deleted_at')
      .update({
        blocked_at: blocked ? (this.db.fn.now() as unknown as Date) : null,
        updated_at: this.db.fn.now() as unknown as Date,
      })
      .returning('*');

    return record;
  }
}
