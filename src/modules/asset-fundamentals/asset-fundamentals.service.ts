import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AssetFundamentalsEntity, AssetMetricsDto, AssetMetricsEntity } from 'lib-typeorm';
import { AssetFundamentalsDto } from 'lib-typeorm';

@Injectable()
export class AssetFundamentalsService {
  constructor(
    @InjectRepository(AssetFundamentalsEntity)
    private readonly assetFundamentalsRepository: Repository<AssetFundamentalsEntity>,
    @InjectRepository(AssetMetricsEntity)
    private readonly assetMetricsRepository: Repository<AssetMetricsEntity>,
  ) {}

  //FUNDAMENTALS SERVICES

  async createFundamental(assetFundamentalsDto: AssetFundamentalsDto): Promise<AssetFundamentalsEntity> {
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

  async findAllFundamentals(query: any): Promise<AssetFundamentalsEntity[]> {
    const queryBuilder = this.assetFundamentalsRepository.createQueryBuilder('asset_fundamentals');
    
    if (query.isin) {
      queryBuilder.andWhere('asset_fundamentals.isin = :isin', { isin: query.isin });
    }

    if (query.periodicity) {
      queryBuilder.andWhere('asset_fundamentals.periodicity LIKE :periodicity', { periodicity: query.periodicity });
    }

    if (query.metric) {
      queryBuilder.andWhere('asset_fundamentals.metric = :metric', { metric : `%${query.metric}%` });
    }

    if (query.fiscalPeriod) {
      queryBuilder.andWhere('asset_fundamentals.fiscalPeriod = :fiscalPeriod', { fiscalPeriod: query.fiscalPeriod });
    }

    if (query.fiscalYear) {
      queryBuilder.andWhere('asset_fundamentals.fiscalYear = :fiscalYear', { fiscalYear: query.fiscalYear });
    }

    if (query.fiscalEndDate) {
      queryBuilder.andWhere('asset_fundamentals.fiscalEndDate = :fiscalEndDate', { fiscalEndDate: query.fiscalEndDate });
    }

    if (query.epsReportDate) {
      queryBuilder.andWhere('asset_fundamentals.epsReportDate = :epsReportDate', { epsReportDate: query.epsReportDate });
    }

    if (query.value) {
      queryBuilder.andWhere('asset_fundamentals.value = :value', { value: query.value });
    }

    return queryBuilder.getMany();
  }

  async findOneFundamental(id: string): Promise<AssetFundamentalsEntity> {
    return this.assetFundamentalsRepository.findOne({ where: { isin: id } });
  }

  async updateFundamental(id: string, newMetric: AssetMetricsEntity): Promise<AssetFundamentalsEntity> {
    const fundamental = await this.assetFundamentalsRepository.findOne({ where: {isin: id}});
  
    if (!fundamental) {
      throw new Error('Fundamental not found');
    }
  
    fundamental.metric = newMetric;
  
    return this.assetFundamentalsRepository.save(fundamental);
  }
  

  async removeFundamental(id: string): Promise<void> {
    await this.assetFundamentalsRepository.delete(id);
  }

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
