import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';

import { AssetEssentialsRtService } from '../modules/asset-essentials-rt/asset-essentials-rt.service';
import { AssetEssentialsRealTimeEntity, AssetEssentialsWithoutRealTimeEntity } from 'lib-typeorm';
import { AssetEssentialsRtJobService } from './asset-essentials-rt-job.service';
import { AssetEssentialsRtProcessorService } from './asset-essentials-rt-processor.service';
import { AssetEssentialsRtModule } from 'src/modules/asset-essentials-rt/asset-essentials-rt.module';
import { getOrmConfig } from 'src/config/ormConfig';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: getOrmConfig,
    }),  
    TypeOrmModule.forFeature([AssetEssentialsRealTimeEntity, AssetEssentialsWithoutRealTimeEntity]),
    BullModule.registerQueue({
      name: 'real-time-data-queue', 
    }),
    ScheduleModule.forRoot(),
    forwardRef(() => AssetEssentialsRtModule),

    BullModule.forRoot({
      redis: {
        host: 'localhost',  
        port: 6379,        
      },
    }),
  ],
  providers: [
    AssetEssentialsRtService,
    AssetEssentialsRtJobService,
    AssetEssentialsRtProcessorService,
  ],
})
export class JobModule {}
