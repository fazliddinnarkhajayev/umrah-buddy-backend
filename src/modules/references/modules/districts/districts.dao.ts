import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { KNEX_CONNECTION } from 'src/core/database/database.constants';
import { TABLE_NAMES } from 'src/shared/constants';
import { BaseDao } from 'src/shared/dao/base.dao';

export interface District {
  id: string;
  name: string;
  region_id: string;
  soato?: string;
  created_at?: Date;
  updated_at?: Date;
  created_by_id?: string;
  updated_by_id?: string;
  is_deleted?: boolean;
}

@Injectable()
export class DistrictsDao extends BaseDao<District> {
  constructor(@Inject(KNEX_CONNECTION) db: Knex) {
    super(TABLE_NAMES.DISTRICTS, db);
  }
}
