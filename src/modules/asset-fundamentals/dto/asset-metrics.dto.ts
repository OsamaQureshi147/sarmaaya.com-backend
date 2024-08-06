import { IsEnum, IsNotEmpty } from 'class-validator';
import { FundamentalsMetricDataType } from 'src/common/interfaces';

export class AssetMetricsDto {
  @IsNotEmpty()
  metric: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  subCategory: string;

  @IsNotEmpty()
  @IsEnum(FundamentalsMetricDataType)
  dataType: FundamentalsMetricDataType;
}
