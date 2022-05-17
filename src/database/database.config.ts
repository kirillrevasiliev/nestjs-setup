import * as path from 'path';

import { registerAs } from '@app/config';

export default registerAs('database', () => ({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  logging: process.env.TYPEORM_LOGGING === 'true' ?? false,
  migrationsTableName: process.env.TYPEORM_MIGRATIONS_TABLE_NAME,
  synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true' ?? false,
  migrationsRun: true,
  autoLoadEntities: true,
  migrations: [path.resolve(__dirname, '../**/migrations/*.{ts,js}')],
  entities: [path.resolve(__dirname, '../**/*.entity{.ts,.js}')],
  extra: {
    max: 85,
  },
}));
