import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { AssetFundamentalsService } from './asset-fundamentals.service';
import { AssetFundamentalsDto } from 'lib-typeorm';
import { AssetFundamentalsEntity } from 'lib-typeorm';

@Controller('asset-fundamentals')
export class AssetFundamentalsController {
  constructor(private readonly assetFundamentalsService: AssetFundamentalsService) {}

  @Post()
  async create(@Body() dto: AssetFundamentalsDto): Promise<AssetFundamentalsEntity> {
    return this.assetFundamentalsService.create(dto);
  }

  @Get()
  async findAll(): Promise<AssetFundamentalsEntity[]> {
    return this.assetFundamentalsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<AssetFundamentalsEntity> {
    return this.assetFundamentalsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: AssetFundamentalsDto): Promise<AssetFundamentalsEntity> {
    return this.assetFundamentalsService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.assetFundamentalsService.remove(id);
  }
}
