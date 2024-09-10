import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetFundamentalsEntity } from 'lib-typeorm';
import { AssetMetricsEntity, AssetDetailsEntity } from 'lib-typeorm';
import { AssetFundamentalsController } from '../asset-fundamentals/asset-fundamentals.controller';
import { AssetFundamentalsService } from '../asset-fundamentals/asset-fundamentals.service';
import { AssetMetricsService } from './asset-metrics.service';
import { AssetMetricsController } from './asset-metrics.controller';


@Module({
  imports: [
    TypeOrmModule.forFeature([AssetFundamentalsEntity, AssetMetricsEntity, AssetDetailsEntity]),
  ],
  providers: [AssetMetricsService,AssetFundamentalsService],
  controllers: [AssetMetricsController, AssetFundamentalsController],
  exports: [AssetMetricsService,AssetFundamentalsService]
})
export class AssetMetricsModule {}
