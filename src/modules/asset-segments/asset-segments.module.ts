import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetSegmentsController } from './asset-segments.controller';
import { AssetSegmentsService } from './asset-segments.service';
import { AssetSegmentsEntity } from 'lib-typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([AssetSegmentsEntity]),
  ],
  controllers: [AssetSegmentsController],
  providers: [AssetSegmentsService],
  exports: [TypeOrmModule],
})
export class AssetSegmentsModule {}
