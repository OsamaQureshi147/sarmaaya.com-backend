// import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
// import { AssetEssentialsService } from './asset-essentials.service';
// import { AssetFundamentalsDto } from 'lib-typeorm';
// import { AssetEssentialsRealTimeEntity } from 'lib-typeorm';
// import { AssetEssentialsWithoutRealTimeEntity } from 'lib-typeorm';

// @Controller('asset-essentials')
// export class AssetEssentialsController {
//   constructor(private readonly assetEssentialsService: AssetEssentialsService) {}

  
//   @Post('real-time')
//   async createRealTime(@Body() dto: AssetFundamentalsDto): Promise<AssetEssentialsRealTimeEntity> {
//     return this.assetEssentialsService.createRealTime(dto);
//   }

//   @Get('real-time')
//   async findAllRealTime(@Query() query: any): Promise<AssetEssentialsRealTimeEntity[]> {
//     return this.assetEssentialsService.findAllRealTime(query);
//   }

//   @Get('real-time/:id')
//   async findOneRealTime(@Param('id') id: string): Promise<AssetEssentialsRealTimeEntity> {
//     return this.assetEssentialsService.findOneRealTime(id);
//   }

//   @Put('real-time/:id')
//   async updateRealTime(@Param('id') id: string, @Body() dto: AssetFundamentalsDto): Promise<AssetEssentialsRealTimeEntity> {
//     return this.assetEssentialsService.updateRealTime(id, dto);
//   }

//   @Delete('real-time/:id')
//   async removeRealTime(@Param('id') id: string): Promise<void> {
//     return this.assetEssentialsService.removeRealTime(id);
//   }

  
//   @Post('without-real-time')
//   async createWithoutRealTime(@Body() dto: AssetFundamentalsDto): Promise<AssetEssentialsWithoutRealTimeEntity> {
//     return this.assetEssentialsService.createWithoutRealTime(dto);
//   }

//   @Get('without-real-time')
//   async findAllWithoutRealTime(@Query() query: any): Promise<AssetEssentialsWithoutRealTimeEntity[]> {
//     return this.assetEssentialsService.findAllWithoutRealTime(query);
//   }

//   @Get('without-real-time/:id')
//   async findOneWithoutRealTime(@Param('id') id: string): Promise<AssetEssentialsWithoutRealTimeEntity> {
//     return this.assetEssentialsService.findOneWithoutRealTime(id);
//   }

//   @Put('without-real-time/:id')
//   async updateWithoutRealTime(@Param('id') id: string, @Body() dto: AssetFundamentalsDto): Promise<AssetEssentialsWithoutRealTimeEntity> {
//     return this.assetEssentialsService.updateWithoutRealTime(id, dto);
//   }

//   @Delete('without-real-time/:id')
//   async removeWithoutRealTime(@Param('id') id: string): Promise<void> {
//     return this.assetEssentialsService.removeWithoutRealTime(id);
//   }
// }
