import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { AssetFundamentalsService } from './asset-fundamentals.service';
import { AssetFundamentalsDto, AssetMetricsDto, AssetMetricsEntity, AssetFundamentalsEntity } from 'lib-typeorm';

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
  async removeFundamental(@Param('isin') isin: string): Promise<void> {
    return this.assetFundamentalsService.removeFundamental(isin);
  }

  //METRICS CONTROLLERS

  @Post('metrics')
  async createMetric (@Body() dto: AssetMetricsDto): Promise <AssetMetricsEntity> {
    return this.assetFundamentalsService.createMetric(dto);
  }

  @Get('metrics')
  async findAllMetrics(@Query() query:any): Promise<AssetMetricsEntity[]> {
    return this.assetFundamentalsService.findAllMetrics(query)
  }

  @Get('/metrics/:metric')
  async findOneMetric(@Param('metric') metric: string): Promise<AssetMetricsEntity> {
    return this.assetFundamentalsService.findOneMetric(metric);
  }

  @Put('/metrics/:metric')
  async updateMetric(@Param('metric') metric: string, @Body() dto: AssetMetricsDto): Promise<AssetMetricsEntity> {
    return this.assetFundamentalsService.updateMetric(metric, dto);
  }

  @Delete('metrics/:metric')
  async removeMetric(@Param('metric') metric: string): Promise<AssetMetricsEntity> {
    return this.assetFundamentalsService.removeMetric(metric);
  }
}
