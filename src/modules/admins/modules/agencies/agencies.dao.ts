import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { KNEX_CONNECTION } from 'src/core/database/database.constants';
import { TABLE_NAMES } from 'src/shared/constants';
import { BaseDao } from 'src/shared/dao/base.dao';

export interface Agency {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  country_id?: string;
  region_id?: string;
  district_id?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'ACTIVE' | 'BLOCKED';
  license_number?: string;
  created_at?: Date;
  updated_at?: Date;
  created_by_id?: string;
  updated_by_id?: string;
  is_deleted?: boolean;
}

@Injectable()
export class AgenciesDao extends BaseDao<Agency> {
  constructor(@Inject(KNEX_CONNECTION) db: Knex) {
    super(TABLE_NAMES.AGENCIES, db);
  }
}
