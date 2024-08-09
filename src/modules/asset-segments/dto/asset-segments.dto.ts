import { IsEnum, IsNotEmpty, Matches } from 'class-validator';
import { ISIN_PATTERN } from 'src/common/constants';
import {
  SegmentMetrics,
  SegmentsPeriodicity,
  SegmentType,
} from 'src/common/interfaces';

export class AssetSegmentsDto {
  @IsNotEmpty()
  @Matches(ISIN_PATTERN)
  isin: string;

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
