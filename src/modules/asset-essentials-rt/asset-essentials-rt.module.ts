import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { AssetEssentialsRtController } from './asset-essentials-rt.controller';
import { AssetEssentialsRealTimeEntity, AssetEssentialsWithoutRealTimeEntity } from 'lib-typeorm';
import { AssetEssentialsRtService } from './asset-essentials-rt.service';

import { AssetEssentialsRtSchedulerService } from './asset-essentials-rt-scheduler.service';
import { AssetEssentialsRtConsumerService } from './asset-essentials-rt-consumer.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      AssetEssentialsRealTimeEntity,
      AssetEssentialsWithoutRealTimeEntity
    ]),
      BullModule.registerQueue({
        name: 'data-queue',
    }),
  ],
  controllers: [AssetEssentialsRtController],
  providers: [AssetEssentialsRtService, AssetEssentialsRtSchedulerService, AssetEssentialsRtConsumerService,],
  exports: [AssetEssentialsRtService],
})
export class AssetEssentialsRtModule {}
