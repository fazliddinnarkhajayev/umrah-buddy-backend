import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Knex, knex } from 'knex';
import { KNEX_CONNECTION } from './database.constants';
import { buildKnexConfig } from './database.config';
import { DatabaseShutdownService } from './database.shutdown.service';

@Global()
@Module({
  providers: [
    {
      provide: KNEX_CONNECTION,
      inject: [ConfigService],
      useFactory: (configService: ConfigService): Knex => {
        return knex(buildKnexConfig(configService));
      },
    },
    DatabaseShutdownService,
  ],
  exports: [KNEX_CONNECTION],
})
export class DatabaseModule { }
