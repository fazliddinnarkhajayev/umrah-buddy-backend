require('dotenv').config();
require('ts-node').register({
  transpileOnly: true,
});

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT || '5432'),
      user: process.env.DATABASE_USER || 'postgres',
      password: process.env.DATABASE_PASSWORD || 'password',
      database: process.env.DATABASE_NAME || 'umrah_buddy',
    },
    migrations: {
      directory: './src/core/database/migrations',
      extension: 'ts',
      loadExtensions: ['.ts'],
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
};
