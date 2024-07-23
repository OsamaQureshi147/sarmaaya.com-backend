import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST!,
  port: parseInt(process.env.DB_PORT!),
  username: process.env.DB_USERNAME!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_DATABASE_NAME!,
  migrationsTransactionMode: 'each',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  logging: false,
  synchronize: false,
  migrationsRun: process.env.NODE_ENV === 'test',
  dropSchema: process.env.NODE_ENV === 'test',
  migrationsTableName: 'migrations',
  migrations: [__dirname + '/../database/migrations/**/*{.ts,.js}'],
};
