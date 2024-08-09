import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { AssetDetailsService } from './asset-details.service';
import { AssetDetailsDto } from 'lib-typeorm';
import { AssetDetailsEntity } from 'lib-typeorm';

@Controller('asset-details')
export class AssetDetailsController {
  constructor(private readonly assetDetailsService: AssetDetailsService) {}

  @Post()
  async create(@Body() assetDetailsDto: AssetDetailsDto): Promise<AssetDetailsEntity> {
    return this.assetDetailsService.create(assetDetailsDto);
  }

  @Get()
  async findAll(@Query() query:any): Promise<AssetDetailsEntity[]> {
    return this.assetDetailsService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<AssetDetailsEntity> {
    return this.assetDetailsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() assetDetailsDto: AssetDetailsDto): Promise<AssetDetailsEntity> {
    return this.assetDetailsService.update(id, assetDetailsDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.assetDetailsService.remove(id);
  }
}
