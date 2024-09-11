import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AssetEssentialsRtController } from './asset-essentials-rt.controller';
import {
  AssetEssentialsRealTimeEntity,
  AssetEssentialsWithoutRealTimeEntity,
} from 'lib-typeorm';
import { AssetEssentialsRtService } from './asset-essentials-rt.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AssetEssentialsRealTimeEntity,
      AssetEssentialsWithoutRealTimeEntity,
    ]),
  ],
  controllers: [AssetEssentialsRtController],
  providers: [AssetEssentialsRtService],
  exports: [AssetEssentialsRtService],
})
export class AssetEssentialsRtModule {}
