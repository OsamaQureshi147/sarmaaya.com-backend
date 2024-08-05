import { CustomBaseEntity } from 'src/common/entity/custom-base.entity';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'asset_essentials_rt',
  comment:
    'Stores every minute data of all symbols, all markets upto one-month',
})
export class AssetEssentialsRealTimeEntity extends CustomBaseEntity {
  @Column()
  isin: string;

  @Column()
  symbol: string;

  @Column('float')
  price: number;

  @Column('float')
  high: number;

  @Column('float')
  low: number;

  @Column()
  volume: number;

  @Column({ name: 'change_password' })
  changePercent: number;

  @Column({ name: 'martket_cap' })
  marketCap: number;
}
