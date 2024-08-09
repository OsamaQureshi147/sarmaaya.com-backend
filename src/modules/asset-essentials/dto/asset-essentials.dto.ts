import { IsNotEmpty, IsNumber, Matches, Min } from 'class-validator';
import { ISIN_PATTERN } from 'src/common/constants';

export class AssetEssentialsDto {
  @IsNotEmpty()
  @Matches(ISIN_PATTERN)
  isin: string;

  @IsNotEmpty()
  symbol: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  high: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  low: number;

  @IsNotEmpty()
  @IsNumber()
  annualChangePercent: number;

  @IsNotEmpty()
  @IsNumber()
  yearToDateChangePercent: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  volume: number;

  @IsNotEmpty()
  changePercent: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  marketCap: number;
}
