import { Controller, Get, Post, Body, Param, Put, Delete, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { AssetEssentialsWrtService } from './asset-essentials-wrt.service';
import {  AssetEssentialsWithoutRealTimeEntity, AssetEssentialsDto } from 'lib-typeorm';

@UsePipes(new ValidationPipe({ transform: true }))
@Controller('asset-essentials-wrt')
export class AssetEssentialsWrtController {
  constructor(private readonly assetEssentialsService: AssetEssentialsWrtService) {}

  
  @Post()
  async createWithoutRealTime(@Body() dto: AssetEssentialsDto): Promise<AssetEssentialsWithoutRealTimeEntity> {
    return this.assetEssentialsService.createWithoutRealTime(dto);
  }

  @Get()
  async findAllWithoutRealTime(@Query() query: AssetEssentialsWithoutRealTimeEntity): Promise<AssetEssentialsWithoutRealTimeEntity[]> {
    return this.assetEssentialsService.findAllWithoutRealTime(query);
  }

  @Get(':isin')
  async findOneWithoutRealTime(@Param('isin') isin: string): Promise<AssetEssentialsWithoutRealTimeEntity> {
    return this.assetEssentialsService.findOneWithoutRealTime(isin);
  }

  @Put(':isin')
  async updateWithoutRealTime(@Param('isin') isin: string, @Body() dto: AssetEssentialsDto): Promise<AssetEssentialsWithoutRealTimeEntity> {
    return this.assetEssentialsService.updateWithoutRealTime(isin, dto);
  }

  @Delete(':isin')
  async removeWithoutRealTime(@Param('isin') isin: string): Promise<{message : string}> {
    return this.assetEssentialsService.removeWithoutRealTime(isin);
  }
}
