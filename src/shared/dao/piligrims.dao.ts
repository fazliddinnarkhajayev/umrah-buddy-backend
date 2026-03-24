import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { KNEX_CONNECTION } from '../../core/database/database.constants';


@Injectable()
export class PiligrimsDao {
  constructor(@Inject(KNEX_CONNECTION) private readonly db: Knex) {}

}
