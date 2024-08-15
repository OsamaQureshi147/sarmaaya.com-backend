import { Controller, Get, Post, Body, Param, Put, Delete, Query, UsePipes, ValidationPipe } from '@nestjs/common';
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

  @Get()
  async findAllRealTime(@Query() query: AssetEssentialsRealTimeEntity): Promise<AssetEssentialsRealTimeEntity[]> {
    return this.assetEssentialsService.findAllRealTime(query);
  }

  @Get(':id')
  async findOneRealTime(@Param('id') id: string): Promise<AssetEssentialsRealTimeEntity> {
    return this.assetEssentialsService.findOneRealTime(id);
  }

  @Put(':id')
  async updateRealTime(@Param('id') id: string, @Body() dto: AssetEssentialsDto): Promise<AssetEssentialsRealTimeEntity> {
    return this.assetEssentialsService.updateRealTime(id, dto);
  }

  @Delete(':id')
  async removeRealTime(@Param('id') id: string): Promise<{ message : string}> {
    return this.assetEssentialsService.removeRealTime(id);
  }

}
