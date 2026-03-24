import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { randomUUID } from 'crypto';
import { KNEX_CONNECTION } from '../../core/database/database.constants';
import { TABLE_NAMES } from '../constants/table-names';

export interface RefreshTokenRecord {
  id: string;
  user_id: string;
  token: string;
  is_revoked: boolean;
  status: 'ACTIVE' | 'REVOKED' | 'EXPIRED';
  is_deleted: boolean;
  expires_at: Date;
  created_at: Date;
}

@Injectable()
export class RefreshTokensDao {
  constructor(@Inject(KNEX_CONNECTION) private readonly db: Knex) {}

  private qb(trx?: Knex.Transaction) {
    return trx
      ? trx<RefreshTokenRecord>(TABLE_NAMES.REFRESH_TOKENS)
      : this.db<RefreshTokenRecord>(TABLE_NAMES.REFRESH_TOKENS);
  }

  async transaction<R>(callback: (trx: Knex.Transaction) => Promise<R>): Promise<R> {
    return this.db.transaction(callback);
  }

  async createRefreshToken(
    userId: string,
    token: string,
    expiresAt: Date,
    trx?: Knex.Transaction,
  ): Promise<RefreshTokenRecord> {
    const [record] = await this.qb(trx)
      .insert({
        id: randomUUID(),
        user_id: userId,
        token,
        is_revoked: false,
        status: 'ACTIVE',
        is_deleted: false,
        expires_at: expiresAt,
      })
      .returning('*');

    return record;
  }

  async findRefreshToken(token: string, trx?: Knex.Transaction): Promise<RefreshTokenRecord | undefined> {
    return this.qb(trx)
      .where({ token, is_deleted: false })
      .where('expires_at', '>', this.db.fn.now())
      .first();
  }

  async revokeRefreshToken(id: string, trx?: Knex.Transaction): Promise<void> {
    await this.qb(trx)
      .where({ id })
      .update({
        is_revoked: true,
        status: 'REVOKED',
      });
  }
}
