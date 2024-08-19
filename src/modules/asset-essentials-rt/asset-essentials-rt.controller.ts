import { Controller, Get, Post, Body, Param, Put, Delete, Query, UsePipes, ValidationPipe, BadRequestException } from '@nestjs/common';
import { AssetEssentialsRtService } from './asset-essentials-rt.service';
import { AssetEssentialsDto, AssetEssentialsRealTimeEntity } from 'lib-typeorm';

@UsePipes(new ValidationPipe({ transform: true }))
@Controller('asset-essentials-rt')
export class AssetEssentialsRtController {
  constructor(private readonly assetEssentialsService: AssetEssentialsRtService) {}

  @Get()
  async findAllRealTime(): Promise<AssetEssentialsRealTimeEntity[]> {
    return this.assetEssentialsService.findAllRealTime();
  }

  @Post()
  async createRealTime(@Body() dto: AssetEssentialsDto): Promise<AssetEssentialsRealTimeEntity> {
    return this.assetEssentialsService.createRealTime(dto);
  }

  @Get(':id')
  async findOneRealTime(@Param('id') id: number): Promise<AssetEssentialsRealTimeEntity> {
    return this.assetEssentialsService.findOneRealTime(id);
  }

  @Get('latest-by-isin')
  async getLatestByIsin(@Query('isin') isin: string): Promise<AssetEssentialsRealTimeEntity> {
    if (!isin) {
      throw new BadRequestException('ISIN is required');
    }

    return this.assetEssentialsService.findLatestByIsin(isin);
  }

  @Get('by-days')
  async getByIsinAndDays(
  @Query('isin') isin: string,
  @Query('days') days?: string,
): Promise<AssetEssentialsRealTimeEntity[]> {
  if (!isin) {
    throw new BadRequestException('ISIN is required');
  }

  let daysNumber: number | null = null;
  if (days !== undefined && days !== null) {
    daysNumber = parseInt(days, 10);
    if (isNaN(daysNumber) || daysNumber <= 0) {
      throw new BadRequestException('Days must be a positive number');
    }
  }

  return this.assetEssentialsService.findByIsinAndDays(isin, daysNumber);
}

@Get('all-latest-isins')
async findAllLatestIsins(
  @Query('days') days?: string,
): Promise<AssetEssentialsRealTimeEntity[]> {
  let daysNumber: number | null = null;
  
  if (days !== undefined && days !== null) {
    daysNumber = parseInt(days, 10);
    console.log(daysNumber)
    if (isNaN(daysNumber) || daysNumber <= 0) {
      throw new BadRequestException('Days must be a positive number');
    }
  }

  return this.assetEssentialsService.findAllLatestIsins(daysNumber);
}


  @Put(':id')
  async updateRealTime(@Param('id') id: number, @Body() dto: AssetEssentialsDto): Promise<AssetEssentialsRealTimeEntity> {
    return this.assetEssentialsService.updateRealTime(id, dto);
  }

  @Delete(':id')
  async removeRealTime(@Param('id') id: string): Promise<{ message : string}> {
    return this.assetEssentialsService.removeRealTime(id);
  }

}
