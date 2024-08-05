import { Entity } from 'typeorm';

import { AssetEssentialsRealTimeEntity } from './asset-essentials-rt.entity';

@Entity({
  name: 'asset_essentials_wrt',
  comment: 'Stores all history data older than one-month, aggregated by day',
})
export class AssetEssentialsWithoutRealTimeEntity extends AssetEssentialsRealTimeEntity {}
