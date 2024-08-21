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

  @Get('isin-and-days')
  async getData(
    @Query('isin') isin: string,
    @Query('days') days: number,
  ) {
    return this.assetEssentialsService.findIsinDatabyDays(isin, days);
  }

  @Get('latest-isin-data')
  async getDataofLatestIsin(@Query('isin') isin: string): Promise<AssetEssentialsRealTimeEntity> {
  if (!isin) {
    throw new BadRequestException('ISIN is required as a query parameter');
  }
  return this.assetEssentialsService.findLatestDataofIsin(isin);
}
  

  @Get('latest-data-of-isins')
  async getLatestDataByIsins(): Promise<AssetEssentialsRealTimeEntity[]> {
    return this.assetEssentialsService.findLatestDataOfIsins();
  }


  @Get(':id')
  async findOneRealTime(@Param('id') id: number): Promise<AssetEssentialsRealTimeEntity> {
    return this.assetEssentialsService.findOneRealTime(id);
  }

  @Put(':id')
  async updateRealTime(@Param('id') id: number, @Body() dto: AssetEssentialsDto): Promise<AssetEssentialsRealTimeEntity> {
    return this.assetEssentialsService.updateRealTime(id, dto);
  }

  @Delete(':id')
  async removeRealTime(@Param('id') id: number): Promise<{ message : string}> {
    return this.assetEssentialsService.removeRealTime(id);
  }

  

}




