import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AssetFundamentalsEntity } from './entity/asset-fundamentals.entity';
import { AssetMetricsEntity } from './entity/asset-metrics.entity';
import { AssetFundamentalsService } from './asset-fundamentals.service';
import { AssetFundamentalsController } from './asset-fundamentals.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([AssetFundamentalsEntity, AssetMetricsEntity]),
  ],
  providers: [AssetFundamentalsService],
  controllers: [AssetFundamentalsController],
})
export class AssetFundamentalsModule {}
