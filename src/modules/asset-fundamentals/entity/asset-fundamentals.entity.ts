import { CustomBaseEntity } from 'src/common/entity/custom-base.entity';
import { Currency, FundamentalsPeriodicity } from 'src/common/interfaces';
import { AssetDetailsEntity } from 'src/modules/asset-details/entity/asset-details.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';

import { AssetMetricsEntity } from './asset-metrics.entity';

@Entity({
  name: 'asset_fundamentals',
})
export class AssetFundamentalsEntity extends CustomBaseEntity {
  @ManyToOne(() => AssetDetailsEntity, { cascade: ['remove'] })
  @JoinColumn({ name: 'isin' })
  isin: string;

  @Column({ type: 'enum', enum: FundamentalsPeriodicity })
  periodicity: FundamentalsPeriodicity;

  @ManyToOne(() => AssetMetricsEntity, { cascade: ['remove'] })
  @JoinColumn({ name: 'metric' })
  metric: AssetMetricsEntity;

  @Column({
    name: 'fiscal_period',
    nullable: true,
    default: null,
    type: 'smallint',
    comment:
      'Will have 1 2 3 4 values based on the quarter, it will be null on yearly periodicity',
  })
  fiscalPeriod: number;

  @Column({ name: 'fiscal_year', type: 'smallint' })
  fiscalYear: number;

  @Column({ name: 'fiscal_end_date' })
  fiscalEndDate: Date;

  @Column({ name: 'eps_report_date' })
  epsReportDate: Date;

  // @Column({ type: 'enum', enum: Currency })
  // currency: Currency;

  @Column()
  value: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
