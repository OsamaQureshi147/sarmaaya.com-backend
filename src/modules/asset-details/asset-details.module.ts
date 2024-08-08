import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AssetDetailsEntity } from './entity/asset-details.entity';
import { AssetDetailsService } from './asset-details.service';

@Module({
  imports: [TypeOrmModule.forFeature([AssetDetailsEntity])],
  providers: [AssetDetailsService],
})
export class AssetDetailsModule {}
