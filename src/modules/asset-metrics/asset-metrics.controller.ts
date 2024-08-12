import { Controller, Get, Post, Body, Param, Put, Delete, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { AssetMetricsService } from './asset-metrics.service';
import { AssetMetricsDto, AssetMetricsEntity} from 'lib-typeorm';

@UsePipes(new ValidationPipe({ transform: true }))
@Controller('asset-metrics')
export class AssetMetricsController {
  constructor(private readonly assetFundamentalsService: AssetMetricsService) {}

  //METRICS CONTROLLERS

  @Post()
  async createMetric (@Body() dto: AssetMetricsDto): Promise <AssetMetricsEntity> {
    return this.assetFundamentalsService.createMetric(dto);
  }

  @Get()
  async findAllMetrics(@Query() query:any): Promise<AssetMetricsEntity[]> {
    return this.assetFundamentalsService.findAllMetrics(query)
  }

  @Get('/:metric')
  async findOneMetric(@Param('metric') metric: string): Promise<AssetMetricsEntity> {
    return this.assetFundamentalsService.findOneMetric(metric);
  }

  @Put('/:metric')
  async updateMetric(@Param('metric') metric: string, @Body() dto: AssetMetricsDto): Promise<AssetMetricsEntity> {
    return this.assetFundamentalsService.updateMetric(metric, dto);
  }

  @Delete('/:metric')
  async removeMetric(@Param('metric') metric: string): Promise<AssetMetricsEntity> {
    return this.assetFundamentalsService.removeMetric(metric);
  }
}
