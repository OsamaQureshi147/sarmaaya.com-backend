import { Controller, Get, Post, Body, Param, Put, Delete, Query, ValidationPipe, UsePipes } from '@nestjs/common';
import { AssetSegmentsService } from './asset-segments.service';
import { AssetSegmentsDto, AssetSegmentsEntity } from 'lib-typeorm';


@UsePipes(new ValidationPipe({ transform: true }))
@Controller('asset-segments')
export class AssetSegmentsController {
  constructor(private readonly assetSegmentsService: AssetSegmentsService) {}

  @Post()
  async create(@Body() assetSegmentsDto: AssetSegmentsDto): Promise<AssetSegmentsEntity> {
    return this.assetSegmentsService.create(assetSegmentsDto);
  }

  @Get()
  async findAll(@Query() query: AssetSegmentsDto): Promise<AssetSegmentsEntity[]> {
    return this.assetSegmentsService.findAllSegments(query);
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
  async remove(@Param('id') id: string): Promise<{ message : string}> {
    return this.assetSegmentsService.remove(id);
  }
}
