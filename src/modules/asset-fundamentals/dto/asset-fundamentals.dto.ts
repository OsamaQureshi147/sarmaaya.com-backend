import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Max,
  Min,
} from 'class-validator';
import { ISIN_PATTERN } from 'src/common/constants';
import { Currency, FundamentalsPeriodicity } from 'src/common/interfaces';

export class AssetFundamentalsDto {
  @IsNotEmpty()
  @Matches(ISIN_PATTERN)
  isin: string;

  @IsEnum(FundamentalsPeriodicity)
  periodicity: FundamentalsPeriodicity;

  @IsString()
  metric: string;

  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(4)
  fiscalPeriod: number;

  @IsNumber()
  fiscalYear: number;

  @IsDate()
  fiscalEndDate: Date;

  @IsDate()
  epsReportDate: Date;

  @IsEnum(Currency)
  currency: Currency;

  @IsNumber()
  value: number;
}
