import { CustomBaseEntity } from 'src/common/entity/custom-base.entity';
import {
  AssetType,
  SegmentMetrics,
  SegmentsPeriodicity,
  SegmentType,
} from 'src/common/interfaces';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'asset_segments' })
export class AssetSegmentsEntity extends CustomBaseEntity {
  @Column()
  isin: string;

  @Column({ name: 'asset_type', type: 'enum', enum: AssetType })
  assetType: AssetType;

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
