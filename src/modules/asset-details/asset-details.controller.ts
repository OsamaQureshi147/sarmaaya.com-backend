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

  @Get(':isin')
  async findOne(@Param('isin') isin: string): Promise<AssetDetailsEntity> {
    return this.assetDetailsService.findOne(isin);
  }

  @Put(':isin')
  async update(@Param('isin') isin: string, @Body() assetDetailsDto: AssetDetailsDto): Promise<AssetDetailsEntity> {
    return this.assetDetailsService.update(isin, assetDetailsDto);
  }

  @Delete(':isin')
  async remove(@Param('isin') isin: string): Promise<void> {
    return this.assetDetailsService.remove(isin);
  }
}
