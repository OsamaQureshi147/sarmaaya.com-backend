import { Controller, Get, Post, Body, Param, Put, Delete, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { AssetMetricsService } from './asset-metrics.service';
import { AssetMetricsDto, AssetMetricsEntity} from 'lib-typeorm';

@UsePipes(new ValidationPipe({ transform: true }))
@Controller('asset-metrics')
export class AssetMetricsController {
  constructor(private readonly assetMetricsService: AssetMetricsService) {}

  //METRICS CONTROLLERS

  @Post()
  async createMetric (@Body() dto: AssetMetricsDto): Promise <AssetMetricsEntity> {
    return this.assetMetricsService.createMetric(dto);
  }

  @Get()
  async findAllMetrics(@Query() query: AssetMetricsEntity): Promise<AssetMetricsEntity[]> {
    return this.assetMetricsService.findAllMetrics(query)
  }

  @Get('/:metric')
  async findOneMetric(@Param('metric') metric: string): Promise<AssetMetricsEntity> {
    return this.assetMetricsService.findOneMetric(metric);
  }

  @Put('/:metric')
  async updateMetric(@Param('metric') metric: string, @Body() dto: AssetMetricsDto): Promise<AssetMetricsEntity> {
    return this.assetMetricsService.updateMetric(metric, dto);
  }

  @Delete('/:metric')
  async removeMetric(@Param('metric') metric: string): Promise<{ message: string}> {
    return this.assetMetricsService.removeMetric(metric);
  }
}
