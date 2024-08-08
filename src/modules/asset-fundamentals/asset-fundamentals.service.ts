import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AssetFundamentalsEntity, AssetMetricsEntity } from 'lib-typeorm';
import { AssetFundamentalsDto } from 'lib-typeorm';

@Injectable()
export class AssetFundamentalsService {
  constructor(
    @InjectRepository(AssetFundamentalsEntity)
    private readonly assetFundamentalsRepository: Repository<AssetFundamentalsEntity>,
    @InjectRepository(AssetMetricsEntity)
    private readonly assetMetricsRepository: Repository<AssetMetricsEntity>,
  ) {}

  async create(assetFundamentalsDto: AssetFundamentalsDto): Promise<AssetFundamentalsEntity> {
    const metricEntity = await this.assetMetricsRepository.findOne({ where: { metric: assetFundamentalsDto.metric } });

    if (!metricEntity) {
      throw new Error('Metric not found');
    }


    const assetFundamentals = this.assetFundamentalsRepository.create({
      ...assetFundamentalsDto,
      metric: metricEntity,
    });

    return this.assetFundamentalsRepository.save(assetFundamentals);
  }

  async findAll(): Promise<AssetFundamentalsEntity[]> {
    return this.assetFundamentalsRepository.find();
  }

  async findOne(id: string): Promise<AssetFundamentalsEntity> {
    return this.assetFundamentalsRepository.findOne({ where: { isin: id } });
  }

  async update(id: string, dto: AssetFundamentalsDto): Promise<AssetFundamentalsEntity> {
    const metricEntity = await this.assetMetricsRepository.findOne({ where: { metric: dto.metric } });

    if (!metricEntity) {
      throw new Error('Metric not found');
    }

    await this.assetFundamentalsRepository.update(id, {
      ...dto,
      metric: metricEntity,
    });

    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.assetFundamentalsRepository.delete(id);
  }
}
