import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetEssentialsRtController } from './asset-essentials-rt.controller';
import { AssetEssentialsRealTimeEntity, AssetEssentialsWithoutRealTimeEntity } from 'lib-typeorm';
import { AssetEssentialsRtService } from './asset-essentials-rt.service';
//import { JobModule } from 'src/jobs/job.module';
import { forwardRef } from '@nestjs/common';
//import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AssetEssentialsRealTimeEntity,
      AssetEssentialsWithoutRealTimeEntity
    ]),
    //forwardRef(() => JobModule),
  ],
  controllers: [AssetEssentialsRtController],
  providers: [AssetEssentialsRtService],
  exports: [AssetEssentialsRtService],
})
export class AssetEssentialsRtModule {}
