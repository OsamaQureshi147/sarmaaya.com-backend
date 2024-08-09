import 'reflect-metadata';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { getOrmConfig } from './config/ormConfig';

//import { AssetDetailsModule,AssetEssentialsModule, AssetFundamentalsModule, AssetSegmentsModule } from 'lib-typeorm';
import { AssetDetailsModule } from './modules/asset-details/asset-details.module';
import { AssetEssentialsModule } from './modules/asset-essentials/asset-essentials.module';
import { AssetFundamentalsModule } from './modules/asset-fundamentals/asset-fundamentals.module';
import { AssetSegmentsModule } from './modules/asset-segments/asset-segments.module';

import { AssetDetailsController } from './modules/asset-details/asset-details.controller';
import { AssetEssentialsController } from './modules/asset-essentials/asset-essentials.controller';
import { AssetFundamentalsController } from './modules/asset-fundamentals/asset-fundamentals.controller';
import { AssetSegmentsController } from './modules/asset-segments/asset-segments.controller';
import { AssetDetailsService } from './modules/asset-details/asset-details.service';
import { AssetFundamentalsService } from './modules/asset-fundamentals/asset-fundamentals.service';
import { AssetSegmentsService } from './modules/asset-segments/asset-segments.service';
import { AssetEssentialsService } from './modules/asset-essentials/asset-essentials.service';
import { AssetDetailsEntity, AssetEssentialsRealTimeEntity, AssetEssentialsWithoutRealTimeEntity, AssetFundamentalsEntity, AssetSegmentsEntity } from 'lib-typeorm';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE_NAME,
      schema: process.env.DB_SCHEMA,
      entities: [AssetDetailsEntity, AssetSegmentsEntity, AssetEssentialsRealTimeEntity, AssetEssentialsWithoutRealTimeEntity], 
      synchronize: true,
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false
        }
      }
      // logging: true,
    }),
    AssetDetailsModule,
    AssetFundamentalsModule,
    AssetSegmentsModule,
    AssetEssentialsModule,
  ],
  controllers: [AppController, AssetDetailsController,AssetEssentialsController, AssetFundamentalsController, AssetSegmentsController],
  providers: [AssetDetailsService, AssetDetailsEntity, AssetEssentialsService, AssetFundamentalsService, AssetSegmentsService],
})
export class AppModule {}
