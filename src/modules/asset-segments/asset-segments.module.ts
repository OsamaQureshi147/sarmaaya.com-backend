import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetSegmentsController } from './asset-segments.controller';
import { AssetSegmentsService } from './asset-segments.service';
import { AssetSegmentsEntity, AssetDetailsEntity } from 'lib-typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([AssetSegmentsEntity, AssetDetailsEntity]),
  ],
  controllers: [AssetSegmentsController],
  providers: [AssetSegmentsService],
  exports: [AssetSegmentsService],
})
export class AssetSegmentsModule {}
