import { IsNotEmpty, IsNumber, Matches, Min } from 'class-validator';

export class AssetEssentialsDto {
  @IsNotEmpty()
  @Matches(/^(SA|PK)\d+/, {
    message: 'The ISIN must start with either "PK" or "SA".',
  })
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
