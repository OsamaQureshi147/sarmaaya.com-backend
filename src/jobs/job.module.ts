import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';

import { AssetEssentialsRtService } from '../modules/asset-essentials-rt/asset-essentials-rt.service';
import { AssetEssentialsRealTimeEntity, AssetEssentialsWithoutRealTimeEntity } from 'lib-typeorm';
import { AssetEssentialsRtJobService } from './asset-essentials-rt-job.service';
import { AssetEssentialsRtProcessorService } from './asset-essentials-rt-processor.service';
import { AssetEssentialsRtModule } from 'src/modules/asset-essentials-rt/asset-essentials-rt.module';
import { getOrmConfig } from 'src/config/ormConfig';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: getOrmConfig,
    }),  
    TypeOrmModule.forFeature([AssetEssentialsRealTimeEntity, AssetEssentialsWithoutRealTimeEntity]),
    BullModule.registerQueue({
      name: 'real-time-data-queue', 
    }),
    forwardRef(() => AssetEssentialsRtModule),
  ],
  providers: [
    AssetEssentialsRtService,
    AssetEssentialsRtJobService,
    AssetEssentialsRtProcessorService,
  ],
})
export class JobModule {}
