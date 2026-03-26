import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { KNEX_CONNECTION } from 'src/core/database/database.constants';
import { TABLE_NAMES } from 'src/shared/constants';
import { BaseDao } from 'src/shared/dao/base.dao';

export interface Country {
  id: string;
  name: string;
  soato?: string;
  created_at?: Date;
  created_by_id?: string;
  updated_at?: Date;
  updated_by_id?: string;
  is_deleted?: boolean;
}

@Injectable()
export class CountriesDao extends BaseDao<Country> {
  constructor(@Inject(KNEX_CONNECTION) db: Knex) {
    super(TABLE_NAMES.COUNTRIES, db);
  }
}
