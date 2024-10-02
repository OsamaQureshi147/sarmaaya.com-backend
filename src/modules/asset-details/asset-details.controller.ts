import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AssetDetailsService } from './asset-details.service';
import { AssetDetailsDto, AssetDetailsEntity } from 'lib-typeorm-pro';
import {  ApiTags } from '@nestjs/swagger';

@ApiTags('asset-details')
@UsePipes(new ValidationPipe({ transform: true }))
@Controller('asset-details')
export class AssetDetailsController {
  constructor(private readonly assetDetailsService: AssetDetailsService) {}

  @Post()
  async create(
    @Body() assetDetailsDto: AssetDetailsDto,
  ): Promise<AssetDetailsEntity> {
    return this.assetDetailsService.create(assetDetailsDto);
  }

  @Get()
  async findAll(
    @Query() query: AssetDetailsEntity,
  ): Promise<AssetDetailsEntity[]> {
    return this.assetDetailsService.findAll(query);
  }

  @Get(':isin')
  async findOne(@Param('isin') isin: string): Promise<AssetDetailsEntity> {
    return this.assetDetailsService.findOne(isin);
  }

  @Put(':isin')
  async update(
    @Param('isin') isin: string,
    @Body() assetDetailsDto: AssetDetailsDto,
  ): Promise<AssetDetailsEntity> {
    return this.assetDetailsService.update(isin, assetDetailsDto);
  }

  @Delete(':isin')
  async remove(@Param('isin') isin: string): Promise<{ message: string }> {
    return this.assetDetailsService.remove(isin);
  }

  @Post('import-trading-names')
  async importTradingNames(): Promise<void> {
    const filePath = 'symbols.csv'; // Update this to your actual file path
    await this.assetDetailsService.importCSVAndUpdateTradingNames(filePath);
  }
}
