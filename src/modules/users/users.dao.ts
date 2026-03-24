import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { Users } from './users.interface';
import { BaseDao } from 'src/shared/dao/base.dao';
import { KNEX_CONNECTION } from 'src/core/database/database.constants';
import { TABLE_NAMES } from 'src/shared/constants';

@Injectable()
export class UsersDao extends BaseDao<Users> {
  constructor(@Inject(KNEX_CONNECTION) db: Knex) {
    super(TABLE_NAMES.USERS, db);
  }

}
