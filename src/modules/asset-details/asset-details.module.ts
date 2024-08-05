import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AssetDetailsEntity } from './entity/asset-details.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AssetDetailsEntity])],
})
export class AssetDetailsModule {}
