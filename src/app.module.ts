import { Module} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getOrmConfig } from './config/ormConfig';

import { AssetDetailsModule } from './modules/asset-details/asset-details.module';
import { AssetFundamentalsModule } from './modules/asset-fundamentals/asset-fundamentals.module';
import { AssetSegmentsModule } from './modules/asset-segments/asset-segments.module';
import { AssetMetricsModule } from './modules/asset-metrics/asset-metrics.module';
import { AssetEssentialsRtModule } from './modules/asset-essentials-rt/asset-essentials-rt.module';
import { AssetEssentialsWrtModule } from './modules/asset-essentials-wrt/asset-essentials-wrt.module';
// import { JobModule } from './jobs/job.module';
// import { BullModule } from '@nestjs/bull';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // BullModule.forRoot({
    //   redis: {
    //     host: 'localhost',  
    //     port: 6379,        
    //   },
    // }),
    TypeOrmModule.forRootAsync({
      useFactory: getOrmConfig,
    }), 
    AssetDetailsModule,
    AssetEssentialsRtModule,
    AssetEssentialsWrtModule,
    AssetSegmentsModule,
    AssetFundamentalsModule,
    AssetMetricsModule,
    //JobModule,
  ],
 
})
export class AppModule {}