const { existsSync } = require('fs');
require('ts-node/register');
require('dotenv').config({
  path: existsSync('.env') ? '.env' : '.env.example',
});

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DATABASE_HOST || '127.0.0.1',
      port: parseInt(process.env.DATABASE_PORT || '5432'),
      user: process.env.DATABASE_USER || 'postgres',
      password: process.env.DATABASE_PASSWORD || 'postgres',
      database: process.env.DATABASE_NAME || 'umrah_buddy',
    },
    migrations: {
      directory: './src/core/database/migrations',
      extension: 'ts',
    },
    pool: { min: 2, max: 10 },
  },

  production: {
    client: 'pg',
    connection: {
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT || '5432'),
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
    },
    migrations: {
      directory: './dist/core/database/migrations',
      extension: 'js',
    },
    pool: { min: 2, max: 20 },
  },
};
