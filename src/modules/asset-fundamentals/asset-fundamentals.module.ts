import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetFundamentalsEntity } from 'lib-typeorm';
import { AssetMetricsEntity } from 'lib-typeorm';
import { AssetFundamentalsController } from './asset-fundamentals.controller';
import { AssetFundamentalsService } from './asset-fundamentals.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AssetFundamentalsEntity, AssetMetricsEntity]),
  ],
  providers: [AssetFundamentalsService],
  controllers: [AssetFundamentalsController],
  exports: [TypeOrmModule],
})
export class AssetFundamentalsModule {}
