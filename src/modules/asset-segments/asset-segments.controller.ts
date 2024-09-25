import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { AssetSegmentsService } from './asset-segments.service';
import { AssetSegmentsDto, AssetSegmentsEntity } from 'lib-typeorm-pro';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('asset-segments')
@UsePipes(new ValidationPipe({ transform: true }))
@Controller('asset-segments')
export class AssetSegmentsController {
  constructor(private readonly assetSegmentsService: AssetSegmentsService) {}

  @Get(':segmentType')
  async getSegmentsByType(
    @Param('segmentType') segmentType: string,
    @Query('isin') isin: string,
    @Query('metric') metric: string
  ) {
    return await this.assetSegmentsService.findSegmentsByIsinAndType(isin, metric, segmentType);
  }

  @Post()
  async create(
    @Body() assetSegmentsDto: AssetSegmentsDto,
  ): Promise<AssetSegmentsEntity> {
    return this.assetSegmentsService.create(assetSegmentsDto);
  }

  @Get()
  async findAll(
    @Query() query: AssetSegmentsEntity,
  ): Promise<AssetSegmentsEntity[]> {
    return this.assetSegmentsService.findAllSegments(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<AssetSegmentsEntity> {
    return this.assetSegmentsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() assetSegmentsDto: AssetSegmentsDto,
  ): Promise<AssetSegmentsEntity> {
    return this.assetSegmentsService.update(id, assetSegmentsDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<{ message: string }> {
    return this.assetSegmentsService.remove(id);
  }
}
