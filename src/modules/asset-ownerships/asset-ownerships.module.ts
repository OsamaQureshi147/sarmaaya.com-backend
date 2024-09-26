import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {AssetOwnershipEntity} from 'lib-typeorm-pro';
import { AssetOwnershipsController } from './asset-ownerships.controller';
import { AssetOwnershipsService } from './asset-ownerships.service';
import { ApiClient } from '@factset/sdk-factsetownership';


@Module({
  imports: [TypeOrmModule.forFeature([AssetOwnershipEntity])],
  providers: [AssetOwnershipsService, ApiClient],
  controllers: [AssetOwnershipsController],
  exports: [AssetOwnershipsService]
})
export class AssetOwnershipsModule {}
