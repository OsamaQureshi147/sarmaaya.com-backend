import { Controller, Get, Post, Body, Param, Put, Delete, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { AssetFundamentalsService } from './asset-fundamentals.service';
import { AssetFundamentalsDto, AssetFundamentalsEntity, AssetMetricsEntity } from 'lib-typeorm';
import { ApiTags, ApiQuery, ApiExtraModels, getSchemaPath } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger';
import {  FundamentalsPeriodicity } from 'src/common/interfaces';

@ApiTags('asset-fundamentals')
@ApiExtraModels(PartialType(AssetFundamentalsDto))
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
  @ApiQuery({
    name: 'isin',
    required: false,
    type: String,
    description: 'The ISIN of the asset',
  })
  @ApiQuery({
    name: 'periodicity',
    required: false,
    enum: FundamentalsPeriodicity, 
    description: 'The periodicity of the data',
  })
  @ApiQuery({
    name: 'metric',
    required: false,
    type: String,
    description: 'The metric of the asset fundamentals',
  })
  @ApiQuery({
    name: 'fiscalPeriod',
    required: false,
    type: Number,
    description: 'The fiscal period (1-4)',
  })
  @ApiQuery({
    name: 'fiscalYear',
    required: false,
    type: Number,
    description: 'The fiscal year',
  })
  @ApiQuery({
    name: 'fiscalEndDate',
    required: false,
    type: String,
    description: 'The end date of the fiscal year',
  })
  @ApiQuery({
    name: 'epsReportDate',
    required: false,
    type: String,
    description: 'The date of the EPS report',
  })
  @ApiQuery({
    name: 'value',
    required: false,
    type: String,
    description: 'The value of the asset',
  })
  async findAllFundamentals(
    @Query() query: Partial<AssetFundamentalsDto>, 
  ): Promise<AssetFundamentalsEntity[]> {
    return this.assetFundamentalsService.findAllFundamentals(query);
  }


  @Get(':id')
  async findOneFundamental(@Param('id') id: number): Promise<AssetFundamentalsEntity | AssetMetricsEntity> {
    return this.assetFundamentalsService.findOneFundamental(id);
  }

  @Put(':id')
  async updateFundamental(@Param('id') id: number, @Body() dto: AssetFundamentalsDto): Promise<AssetFundamentalsEntity> {
    return this.assetFundamentalsService.updateFundamental(id,dto);
  }

  @Delete(':id')
  async removeFundamental(@Param('id') id: string): Promise<{message : string}> {
    return this.assetFundamentalsService.removeFundamental(id);
  }

}