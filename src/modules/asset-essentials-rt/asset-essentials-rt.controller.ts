import { Controller, Get, Post, Body, Param, Put, Delete, Query, UsePipes, ValidationPipe, BadRequestException } from '@nestjs/common';
import { AssetEssentialsRtService } from './asset-essentials-rt.service';
import { AssetEssentialsDto, AssetEssentialsRealTimeEntity } from 'lib-typeorm';

@UsePipes(new ValidationPipe({ transform: true }))
@Controller('asset-essentials-rt')
export class AssetEssentialsRtController {
  constructor(private readonly assetEssentialsService: AssetEssentialsRtService) {}

  
  @Post()
  async createRealTime(@Body() dto: AssetEssentialsDto): Promise<AssetEssentialsRealTimeEntity> {
    return this.assetEssentialsService.createRealTime(dto);
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
  async removeRealTime(@Param('id') id: string): Promise<{ message : string}> {
    return this.assetEssentialsService.removeRealTime(id);
  }

}
