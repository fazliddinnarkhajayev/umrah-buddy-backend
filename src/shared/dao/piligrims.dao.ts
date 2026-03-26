import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { KNEX_CONNECTION } from '../../core/database/database.constants';
import { TABLE_NAMES } from '../constants/table-names';
import { BaseDao } from './base.dao';

export interface Pilgrim {
  id: string;
  first_name: string;
  last_name?: string;
  middle_name?: string;
  phone?: string;
  email?: string;
  country_id?: string;
  region_id?: string;
  district_id?: string;
  user_id: string;
  status: 'ACTIVE' | 'BLOCKED';
  is_blocked: boolean;
  blocked_at?: Date;
  created_at?: Date;
  created_by_id?: string;
  updated_at?: Date;
  updated_by_id?: string;
  is_deleted?: boolean;
}

@Injectable()
export class PilgrimsDao extends BaseDao<Pilgrim> {
  constructor(@Inject(KNEX_CONNECTION) db: Knex) {
    super(TABLE_NAMES.PILGRIMS, db);
  }

  async findByUserId(userId: string, trx?: Knex.Transaction): Promise<Pilgrim | undefined> {
    const record = await this.qb(trx).where({ user_id: userId, is_deleted: false }).first();
    return record as Pilgrim | undefined;
  }
}
