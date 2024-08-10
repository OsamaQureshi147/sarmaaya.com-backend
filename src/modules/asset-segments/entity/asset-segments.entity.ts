import { CustomBaseEntity } from 'src/common/entity/custom-base.entity';
import {
  SegmentMetrics,
  SegmentsPeriodicity,
  SegmentType,
} from 'src/common/interfaces';
import { AssetDetailsEntity } from 'src/modules/asset-details/entity/asset-details.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'asset_segments' })
export class AssetSegmentsEntity extends CustomBaseEntity {
  @ManyToOne(() => AssetDetailsEntity, { cascade: ['remove'] })
  @JoinColumn({ name: 'isin' })
  isin: string;

  @Column({
    comment:
      'country name in case of "GEO" segment type and sector name in case of "BUS',
  })
  label: string;

  @Column()
  value: number;

  @Column({ name: 'metric', type: 'enum', enum: SegmentMetrics })
  metric: string;

  @Column({ name: 'segment_type', type: 'enum', enum: SegmentType })
  segmentType: string;

  @Column({ name: 'periodicity', type: 'enum', enum: SegmentsPeriodicity })
  periodicity: string;
}
