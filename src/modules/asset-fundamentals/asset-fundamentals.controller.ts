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
  async findAllFundamentals(@Query() query:AssetFundamentalsEntity): Promise<AssetFundamentalsEntity[]> {
    return this.assetFundamentalsService.findAllFundamentals(query);
  }

  @Get('/:id')
  async findOneFundamental(@Param('id') id: string): Promise<AssetFundamentalsEntity> {
    return this.assetFundamentalsService.findOneFundamental(id);
  }

  @Put('/:id')
  async updateFundamental(@Param('id') id: string, @Body() dto: AssetFundamentalsDto): Promise<AssetFundamentalsEntity> {
    return this.assetFundamentalsService.updateFundamental(id,dto);
  }

  @Delete('/:id')
  async removeFundamental(@Param('id') id: string): Promise<{message : string}> {
    return this.assetFundamentalsService.removeFundamental(id);
  }

}