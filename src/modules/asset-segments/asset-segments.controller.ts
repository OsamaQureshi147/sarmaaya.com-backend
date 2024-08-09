import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { AssetSegmentsService } from './asset-segments.service';
import { AssetSegmentsDto } from 'lib-typeorm';
import { AssetSegmentsEntity } from 'lib-typeorm';

@Controller('asset-segments')
export class AssetSegmentsController {
  constructor(private readonly assetSegmentsService: AssetSegmentsService) {}

  @Post()
  async create(@Body() assetSegmentsDto: AssetSegmentsDto): Promise<AssetSegmentsEntity> {
    return this.assetSegmentsService.create(assetSegmentsDto);
  }

  @Get()
  async findAll(@Query() query: any): Promise<AssetSegmentsEntity[]> {
    return this.assetSegmentsService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<AssetSegmentsEntity> {
    return this.assetSegmentsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() assetSegmentsDto: AssetSegmentsDto): Promise<AssetSegmentsEntity> {
    return this.assetSegmentsService.update(id, assetSegmentsDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.assetSegmentsService.remove(id);
  }
}
