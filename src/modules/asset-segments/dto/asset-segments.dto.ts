import { IsEnum, IsNotEmpty, Matches } from 'class-validator';
import {
  AssetType,
  SegmentMetrics,
  SegmentsPeriodicity,
  SegmentType,
} from 'src/common/interfaces';

export class AssetSegmentsDto {
  @IsNotEmpty()
  @Matches(/^(SA|PK)\d+/, {
    message: 'The ISIN must start with either "PK" or "SA".',
  })
  isin: string;

  @IsNotEmpty()
  @IsEnum(AssetType)
  assetType: AssetType;

  @IsNotEmpty()
  label: string;

  @IsNotEmpty()
  value: number;

  @IsNotEmpty()
  @IsEnum(SegmentMetrics)
  metric: SegmentMetrics;

  @IsNotEmpty()
  @IsEnum(SegmentType)
  segmentType: SegmentType;

  @IsNotEmpty()
  @IsEnum(SegmentsPeriodicity)
  periodicity: SegmentsPeriodicity;
}
