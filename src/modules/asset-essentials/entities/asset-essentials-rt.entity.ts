import { CustomBaseEntity } from 'src/common/entity/custom-base.entity';
import { AssetDetailsEntity } from 'src/modules/asset-details/entity/asset-details.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({
  name: 'asset_essentials_rt',
  comment:
    'Stores every minute data of all symbols, all markets upto one-month',
})
export class AssetEssentialsRealTimeEntity extends CustomBaseEntity {
  @ManyToOne(() => AssetDetailsEntity, (asset) => asset.isin, {
    cascade: ['remove'],
  })
  @JoinColumn({ name: 'isin' })
  isin: string;

  @Column()
  symbol: string;

  @Column('float')
  price: number;

  @Column('float')
  high: number;

  @Column('float')
  low: number;

  @Column({ name: 'annual_change_percent', type: 'float' })
  annualChangePercent: number;

  @Column({ name: 'ytd_percent', type: 'float' })
  yearToDateChangePercent: number;

  @Column()
  volume: number;

  @Column({ name: 'change_percent' })
  changePercent: number;

  @Column({ name: 'market_cap' })
  marketCap: number;
}
