import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AssetFundamentalsEntity } from './entity/asset-fundamentals.entity';
import { AssetMetricsEntity } from './entity/asset-metrics.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AssetFundamentalsEntity, AssetMetricsEntity]),
  ],
})
export class AssetFundamentalsModule {}
