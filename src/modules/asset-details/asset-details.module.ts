import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetDetailsEntity } from 'lib-typeorm-pro';
import { AssetDetailsController } from './asset-details.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AssetDetailsEntity])],
  providers: [AssetDetailsService],
  controllers: [AssetDetailsController],
  exports: [AssetDetailsService],
})
export class AssetDetailsModule {}
