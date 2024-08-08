import { Module } from '@nestjs/common';
import { AssetSegmentsController } from './asset-segments.controller';
import { AssetSegmentsService } from './asset-segments.service';

@Module({
  controllers: [AssetSegmentsController],
  providers: [AssetSegmentsService]
})
export class AssetSegmentsModule {}
