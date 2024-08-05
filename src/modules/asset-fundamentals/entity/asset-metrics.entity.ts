import { CustomBaseEntity } from 'src/common/entity/custom-base.entity';
import { FundamentalsMetricDataType } from 'src/common/interfaces';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'asset_metrics',
  comment:
    'This table stores the factset metrics that are crucial for our application',
})
export class AssetMetricsEntity extends CustomBaseEntity {
  @Column({ unique: true })
  metric: string;

  @Column()
  name: string;

  @Column()
  category: string;

  @Column({ name: 'sub_category' })
  subCategory: string;

  @Column({ name: 'data_type', type: 'enum', enum: FundamentalsMetricDataType })
  dataType: string;
}
