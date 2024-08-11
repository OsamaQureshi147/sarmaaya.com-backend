import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AssetEssentialsRtController } from './asset-essentials-rt.controller';
import { AssetEssentialsRealTimeEntity } from 'lib-typeorm';
import { AssetEssentialsRtService } from './asset-essentials-rt.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AssetEssentialsRealTimeEntity,
    ]),
  ],
  controllers: [AssetEssentialsRtController],
  providers: [AssetEssentialsRtService],
  exports: [TypeOrmModule],
})
export class AssetEssentialsRtModule {}
