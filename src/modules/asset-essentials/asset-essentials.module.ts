import { Module } from '@nestjs/common';

import { AssetEssentialsController } from './asset-essentials.controller';

@Module({
  controllers: [AssetEssentialsController],
})
export class AssetEssentialsModule {}
