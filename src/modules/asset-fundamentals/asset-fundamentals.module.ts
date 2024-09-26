import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetDetailsEntity, AssetFundamentalsEntity, AssetMetricsEntity } from 'lib-typeorm-pro';
import { AssetFundamentalsController } from './asset-fundamentals.controller';
import { AssetFundamentalsService } from './asset-fundamentals.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AssetFundamentalsEntity, AssetMetricsEntity, AssetDetailsEntity]),
  ],
  providers: [AssetFundamentalsService],
  controllers: [AssetFundamentalsController],
  exports: [AssetFundamentalsService],
})
export class AssetFundamentalsModule {}
