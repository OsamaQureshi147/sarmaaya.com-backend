import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
} from 'class-validator';
import { ISIN_PATTERN } from 'src/common/constants';
import { AssetType, ExchangeId } from 'src/common/interfaces';

// import { Brand } from '../interfaces/brand.interface';

export class AssetDetailsDto {
  @IsNotEmpty()
  @Matches(ISIN_PATTERN)
  isin: string;

  @IsOptional()
  companyName: string;

  @IsEnum(ExchangeId)
  @IsOptional()
  exchangeId: ExchangeId;

  @IsNotEmpty()
  @IsEnum(AssetType)
  assetType: AssetType;

  @IsString()
  @IsOptional()
  sector: string;

  @IsString()
  @IsOptional()
  industry: string;

  @IsUrl()
  @IsOptional()
  website: string;

  //   @TODO create brands column
  //   @IsArray()
  //   @IsNotEmpty()
  //   brands: Brand[];

  @IsOptional()
  @IsNumber()
  companySize: number;

  @IsOptional()
  @IsString()
  about: string;

  @IsBoolean()
  isShariah: boolean;
}
