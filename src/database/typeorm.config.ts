import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig = (): TypeOrmModuleOptions => {
  const host = process.env.DB_HOST || 'localhost';
  const port = parseInt(process.env.DB_PORT || '5432', 10);
  return {
    type: 'postgres',
    host,
    port,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'postgres',
    database: process.env.DB_NAME || 'ynov_db',
    entities: [__dirname + '/../**/*.entity{.ts,.js}', __dirname + '/../**/*.schema{.ts,.js}'],
    synchronize: process.env.TYPEORM_SYNC === 'true',
    // useful for transient network issues
    retryAttempts: 5,
    retryDelay: 3000,
    logging: false,
  } as TypeOrmModuleOptions;
};
