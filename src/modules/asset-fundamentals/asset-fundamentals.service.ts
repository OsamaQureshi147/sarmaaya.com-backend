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

}