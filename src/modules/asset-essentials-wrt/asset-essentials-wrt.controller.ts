import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { AssetEssentialsWrtService } from './asset-essentials-wrt.service';
import { AssetFundamentalsDto } from 'lib-typeorm';
import { AssetEssentialsRealTimeEntity } from 'lib-typeorm';
import { AssetEssentialsWithoutRealTimeEntity } from 'lib-typeorm';

@Controller('asset-essentials-wrt')
export class AssetEssentialsWrtController {
  constructor(private readonly assetEssentialsService: AssetEssentialsWrtService) {}

  
  @Post()
  async createWithoutRealTime(@Body() dto: AssetFundamentalsDto): Promise<AssetEssentialsWithoutRealTimeEntity> {
    return this.assetEssentialsService.createWithoutRealTime(dto);
  }

  @Get()
  async findAllWithoutRealTime(@Query() query: any): Promise<AssetEssentialsWithoutRealTimeEntity[]> {
    return this.assetEssentialsService.findAllWithoutRealTime(query);
  }

  @Get(':isin')
  async findOneWithoutRealTime(@Param('id') id: string): Promise<AssetEssentialsWithoutRealTimeEntity> {
    return this.assetEssentialsService.findOneWithoutRealTime(id);
  }

  @Put(':isin')
  async updateWithoutRealTime(@Param('id') id: string, @Body() dto: AssetFundamentalsDto): Promise<AssetEssentialsWithoutRealTimeEntity> {
    return this.assetEssentialsService.updateWithoutRealTime(id, dto);
  }

  @Delete(':id')
  async removeWithoutRealTime(@Param('id') id: string): Promise<void> {
    return this.assetEssentialsService.removeWithoutRealTime(id);
  }
}
