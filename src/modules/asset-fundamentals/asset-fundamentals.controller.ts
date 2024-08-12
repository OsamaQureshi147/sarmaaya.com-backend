import { Controller, Get, Post, Body, Param, Put, Delete, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { AssetFundamentalsService } from './asset-fundamentals.service';
import { AssetFundamentalsDto, AssetFundamentalsEntity } from 'lib-typeorm';

@UsePipes(new ValidationPipe({ transform: true }))
@Controller('asset-fundamentals')
export class AssetFundamentalsController {
  constructor(private readonly assetFundamentalsService: AssetFundamentalsService) {}

  //FUNDAMENTALS CONTROLLERS

  @Post()
  async createFundamental(@Body() dto: AssetFundamentalsDto): Promise<AssetFundamentalsEntity> {
    return this.assetFundamentalsService.createFundamental(dto);
  }

  @Get()
  async findAllFundamentals(@Query() query:any): Promise<AssetFundamentalsEntity[]> {
    return this.assetFundamentalsService.findAllFundamentals(query);
  }

  @Get(':id')
  async findOneFundamental(@Param('isin') isin: string): Promise<AssetFundamentalsEntity> {
    return this.assetFundamentalsService.findOneFundamental(isin);
  }

  @Put(':id')
  async updateFundamental(@Param('isin') isin: string, @Body() dto: AssetFundamentalsDto): Promise<AssetFundamentalsEntity> {
    return this.assetFundamentalsService.updateFundamental(isin, dto);
  }

  @Delete(':id')
  async removeFundamental(@Param('isin') isin: string): Promise<{message: string}> {
    return this.assetFundamentalsService.removeFundamental(isin);
  }

}