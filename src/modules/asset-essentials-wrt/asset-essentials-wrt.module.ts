import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AssetEssentialsWrtController } from './asset-essentials-wrt.controller';
import { AssetEssentialsWithoutRealTimeEntity } from 'lib-typeorm'
import { AssetEssentialsWrtService } from './asset-essentials-wrt.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AssetEssentialsWithoutRealTimeEntity,
    ]),
  ],
  controllers: [AssetEssentialsWrtController],
  providers: [AssetEssentialsWrtService],
  exports: [TypeOrmModule],
})
export class AssetEssentialsWrtModule {}
