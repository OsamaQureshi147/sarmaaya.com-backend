import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AssetOwnershipEntity, AssetDetailsEntity, AssetEssentialsRealTimeEntity, AssetEssentialsWithoutRealTimeEntity, AssetFundamentalsEntity, AssetMetricsEntity, AssetSegmentsEntity } from 'lib-typeorm-pro';


export const getOrmConfig = () =>
  <TypeOrmModuleOptions>{
    type: 'postgres',
    host: process.env.DB_HOST!,
    port: parseInt(process.env.DB_PORT!),
    username: process.env.DB_USERNAME!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_DATABASE_NAME!,
    migrationsTransactionMode: 'each',
    ssl: {
      rejectUnauthorized: false,
    },
    entities: [AssetOwnershipEntity, AssetDetailsEntity, AssetSegmentsEntity, AssetMetricsEntity, AssetFundamentalsEntity, AssetEssentialsRealTimeEntity, AssetEssentialsWithoutRealTimeEntity, AssetMetricsEntity],
    logging: true,
    synchronize: false,
    migrationsRun: process.env.NODE_ENV === 'test',
    dropSchema: process.env.NODE_ENV === 'test',
    migrationsTableName: 'migrations',
    migrations: [__dirname + '/../database/migrations/**/*{.ts,.js}'],
  };
