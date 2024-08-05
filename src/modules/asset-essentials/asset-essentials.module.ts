import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AssetEssentialsController } from './asset-essentials.controller';
import { AssetEssentialsRealTimeEntity } from './entities/asset-essentials-rt.entity';
import { AssetEssentialsWithoutRealTimeEntity } from './entities/asset-essentials-wrt.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AssetEssentialsRealTimeEntity,
      AssetEssentialsWithoutRealTimeEntity,
    ]),
  ],
  controllers: [AssetEssentialsController],
})
export class AssetEssentialsModule {}
