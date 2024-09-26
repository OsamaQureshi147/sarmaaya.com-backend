import { Controller, Get, Post, Body, Param, Put, Delete, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { AssetEssentialsWrtService } from './asset-essentials-wrt.service';
import {  AssetEssentialsWithoutRealTimeEntity, AssetEssentialsDto } from 'lib-typeorm-pro';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('asset-essentials-wrt')
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

  @Get(':id')
  async findOneWithoutRealTime(@Param('id') id: number): Promise<AssetEssentialsWithoutRealTimeEntity> {
    return this.assetEssentialsService.findOneWithoutRealTime(id);
  }

  @Put(':id')
  async updateWithoutRealTime(@Param('id') id: number, @Body() dto: AssetEssentialsDto): Promise<AssetEssentialsWithoutRealTimeEntity> {
    return this.assetEssentialsService.updateWithoutRealTime(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<{ message: string }> {
    return this.assetEssentialsService.removeWithoutRealTime(id);
}
}
