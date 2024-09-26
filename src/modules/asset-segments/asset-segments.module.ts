import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetSegmentsController } from './asset-segments.controller';
import { AssetSegmentsService } from './asset-segments.service';
import { AssetSegmentsEntity } from 'lib-typeorm-pro';

@Module({
  imports: [
    TypeOrmModule.forFeature([AssetSegmentsEntity]),
  ],
  controllers: [AssetSegmentsController],
  providers: [AssetSegmentsService],
  exports: [AssetSegmentsService],
})
export class AssetSegmentsModule {}
