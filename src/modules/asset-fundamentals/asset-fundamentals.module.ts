import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AssetFundamentalsEntity } from './entity/asset-fundamentals.entity';
import { AssetMetricsEntity } from './entity/asset-metrics.entity';
import { AssetFundamentalsService } from './asset-fundamentals.service';
import { AssetFundamentalsController } from './asset-fundamentals.controller';
import { AssetMetricsService } from './asset-metrics/asset-metrics.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AssetFundamentalsEntity, AssetMetricsEntity]),
  ],
  providers: [AssetFundamentalsService, AssetMetricsService],
  controllers: [AssetFundamentalsController],
})
export class AssetFundamentalsModule {}
