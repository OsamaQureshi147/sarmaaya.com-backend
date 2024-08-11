import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AssetFundamentalsEntity, AssetMetricsDto, AssetMetricsEntity } from 'lib-typeorm';


@Injectable()
export class AssetMetricsService {
  constructor(
    @InjectRepository(AssetFundamentalsEntity)
    private readonly assetFundamentalsRepository: Repository<AssetFundamentalsEntity>,
    @InjectRepository(AssetMetricsEntity)
    private readonly assetMetricsRepository: Repository<AssetMetricsEntity>,
  ) {}

  //METRICS SERVICES 

  async createMetric (assetMetricsDto: AssetMetricsDto): Promise<AssetMetricsEntity> {
    const existingMetric = await this.assetMetricsRepository.findOne({ where: { metric: assetMetricsDto.metric } });

    if (existingMetric) {
      throw new Error('Metric already exists');
    }

  
    const assetMetric = this.assetMetricsRepository.create(assetMetricsDto)

    return this.assetMetricsRepository.save(assetMetric);
  }

  async findAllMetrics(query: any): Promise<AssetMetricsEntity[]> {
    const queryBuilder = this.assetMetricsRepository.createQueryBuilder('asset_metrics');
    
    if (query.metric) {
      queryBuilder.andWhere('asset_metrics.metric = :metric', { metric : `%${query.metric}%` });
    }

    if (query.name) {
      queryBuilder.andWhere('asset_metrics.name LIKE :name', { name : `%${query.name}%` });
    }

    if (query.category) {
      queryBuilder.andWhere('asset_metrics.category = :category', { category : `%${query.category}%` });
    }

    if (query.subCategory) {
      queryBuilder.andWhere('asset_metrics.subCategory = :subCategory', { subCategory : `%${query.subcategory}%` });
    }

    if (query.dataType) {
      queryBuilder.andWhere('asset_metrics.dataType = :dataType', { dataType : `%${query.dataType}%` });
    }

    
    return queryBuilder.getMany();
  }

  async findOneMetric (metric: string): Promise<AssetMetricsEntity> {
    return this.assetMetricsRepository.findOne({ where: { metric: metric} });
  }

  async updateMetric(metric: string, updateData: Partial<AssetMetricsEntity>): Promise<AssetMetricsEntity> {
    const existingMetric = await this.assetMetricsRepository.findOne({ where: { metric } });
  
    if (!existingMetric) {
      throw new Error('Metric not found');
    }
  
    Object.assign(existingMetric, updateData);
  
    await this.assetMetricsRepository.save(existingMetric);
  
    const relatedFundamentals = await this.assetFundamentalsRepository.find({
      where: { metric: existingMetric },
    });
  
    for (const fundamental of relatedFundamentals) {
      fundamental.metric = existingMetric;
      await this.assetFundamentalsRepository.save(fundamental);
    }
  
    return existingMetric;
  }
  
  async removeMetric(metric: string): Promise<AssetMetricsEntity> {
    const metricEntity = await this.assetMetricsRepository.findOne({ where: { metric } });
  
    if (!metricEntity) {
      throw new Error('Metric not found');
    }
  
    const fundamentals = await this.assetFundamentalsRepository.find({ where: { metric: metricEntity } });
  
    if (fundamentals.length > 0) {
      await this.assetFundamentalsRepository.remove(fundamentals);
    }
    await this.assetMetricsRepository.remove(metricEntity);
  
    return metricEntity;
  }
}
