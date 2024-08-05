import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { getOrmConfig } from './config/ormConfig';
import { AssetDetailsModule } from './modules/asset-details/asset-details.module';
import { AssetEssentialsModule } from './modules/asset-essentials/asset-essentials.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: () => getOrmConfig(),
    }),
    AssetEssentialsModule,
    AssetDetailsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
