import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  Matches,
} from 'class-validator';

// import { Brand } from '../interfaces/brand.interface';

export class AssetDetailsDto {
  @IsNotEmpty()
  @Matches(/^(SA|PK)\d+/, {
    message: 'The ISIN must start with either "PK" or "SA".',
  })
  isin: string;

  @IsString()
  @IsNotEmpty()
  sector: string;

  @IsString()
  @IsNotEmpty()
  industry: string;

  @IsUrl()
  @IsNotEmpty()
  website: string;

  //   @TODO create brands column
  //   @IsArray()
  //   @IsNotEmpty()
  //   brands: Brand[];

  @IsNotEmpty()
  @IsNumber()
  companySize: number;

  @IsNotEmpty()
  @IsString()
  about: string;

  @IsBoolean()
  isShariah: boolean;
}
