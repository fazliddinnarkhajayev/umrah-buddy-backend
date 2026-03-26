import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { KNEX_CONNECTION } from 'src/core/database/database.constants';
import { TABLE_NAMES } from 'src/shared/constants';
import { BaseDao } from 'src/shared/dao/base.dao';

export interface AgencyUser {
  id: string;
  agency_id: string;
  user_id: string;
  first_name: string;
  last_name?: string;
  middle_name?: string;
  phone: string;
  role: string;
  status: 'ACTIVE' | 'BLOCKED' | 'DELETED';
  created_at?: Date;
  updated_at?: Date;
  created_by_id?: string;
  updated_by_id?: string;
  is_deleted?: boolean;
}

@Injectable()
export class AgencyUsersDao extends BaseDao<AgencyUser> {
  constructor(@Inject(KNEX_CONNECTION) db: Knex) {
    super(TABLE_NAMES.AGENCY_USERS, db);
  }
}
