import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {AssetDetailsEntity, AssetOwnershipEntity} from 'lib-typeorm-pro';
import { AssetOwnershipsController } from './asset-ownerships.controller';
import { AssetOwnershipsService } from './asset-ownerships.service';
import { ApiClient } from '@factset/sdk-factsetownership';


@Module({
  imports: [TypeOrmModule.forFeature([AssetOwnershipEntity, AssetDetailsEntity])],
  providers: [AssetOwnershipsService, ApiClient, AssetDetailsEntity],
  controllers: [AssetOwnershipsController],
  exports: [AssetOwnershipsService]
})
export class AssetOwnershipsModule {}
