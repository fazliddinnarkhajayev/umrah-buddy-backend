import { Inject, Injectable, OnApplicationShutdown } from '@nestjs/common';
import { Knex } from 'knex';
import { KNEX_CONNECTION } from './database.constants';

@Injectable()
export class DatabaseShutdownService implements OnApplicationShutdown {
  constructor(@Inject(KNEX_CONNECTION) private readonly db: Knex) { }

  async onApplicationShutdown(): Promise<void> {
    await this.db.destroy();
  }
}
