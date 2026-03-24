import { Knex } from 'knex';
import { ConfigService } from '@nestjs/config';

export function buildKnexConfig(configService: ConfigService): Knex.Config {
  return {
    client: 'pg',
    connection: {
      host: configService.get<string>('DATABASE_HOST'),
      port: configService.get<number>('DATABASE_PORT'),
      user: configService.get<string>('DATABASE_USER'),
      password: configService.get<string>('DATABASE_PASSWORD'),
      database: configService.get<string>('DATABASE_NAME'),
    },
    pool: {
      min: 2,
      max: 10,
    },
  };
}
