import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetDetailsEntity } from 'lib-typeorm-pro';

<<<<<<< HEAD
import { AssetDetailsService } from './asset-details.service';
=======
>>>>>>> 757fdfcbe8661ef5af3e86d00f8172bda3ea9991
import { AssetDetailsController } from './asset-details.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AssetDetailsEntity])],
  providers: [AssetDetailsService],
  controllers: [AssetDetailsController],
  exports: [AssetDetailsService],
})
export class AssetDetailsModule {}
