import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { AssetFundamentalsEntity, AssetMetricsEntity, AssetFundamentalsDto} from 'lib-typeorm';
import { FindOptionsWhere } from 'typeorm';
import { In, Between } from 'typeorm';

@Injectable()
export class AssetFundamentalsService {
  constructor(
    @InjectRepository(AssetFundamentalsEntity)
    private readonly assetFundamentalsRepository: Repository<AssetFundamentalsEntity>,
    @InjectRepository(AssetMetricsEntity)
    private readonly assetMetricsRepository: Repository<AssetMetricsEntity>,
  ) {}

  //FUNDAMENTALS SERVICES

  async createFundamental(assetFundamentalsDto: AssetFundamentalsDto): Promise<AssetFundamentalsEntity>{
    const metric = await this.assetMetricsRepository.findOne({ where: { metric: assetFundamentalsDto.metric } });

    if (!metric) {
      throw new NotFoundException('Metric not found');
    }

    const assetFundamental = this.assetFundamentalsRepository.create({
      ...assetFundamentalsDto,
      metric: metric, 
  } as unknown as DeepPartial<AssetFundamentalsEntity>);

    return await this.assetFundamentalsRepository.save(assetFundamental);
  }

  // async findAllFundamentals(
  //   query: Partial<AssetFundamentalsDto>, 
  // ): Promise<AssetFundamentalsEntity[]> {
  //   const where: FindOptionsWhere<AssetFundamentalsEntity> = {};

  //   Object.keys(query).forEach((key) => {
  //     const value = query[key];
  //     if (value !== undefined && value !== null) {
  //       where[key] = value; 
  //     }
  //   });

  //   return this.assetFundamentalsRepository.find({
  //     where,
  //     relations: ['metric'], 
  //   });
  // }

  async findAllFundamentals(
    query: Partial<AssetFundamentalsDto> & { startDate?: string, endDate?: string }, // Add startDate and endDate as query params
  ): Promise<AssetFundamentalsEntity[]> {
    const where: FindOptionsWhere<AssetFundamentalsEntity> = {};
  
    Object.keys(query).forEach((key) => {
      const value = query[key];
      if (value !== undefined && value !== null) {
        if (key === 'metric') {
          const metricsArray = Array.isArray(value) ? value : value.split(',').map(item => item.trim());
          where[key] = In(metricsArray);
        } else if (key === 'isin') {
          const isinsArray = Array.isArray(value) ? value : value.split(',').map(item => item.trim());
          where[key] = In(isinsArray);
        } else if (key === 'startDate' || key === 'endDate') {
        } else {
          where[key] = value;
        }
      }
    });
  
    if (query.startDate && query.endDate) {
      where.epsReportDate = Between(new Date(query.startDate), new Date(query.endDate));
    } else if (query.startDate) {
      where.epsReportDate = Between(new Date(query.startDate), new Date()); // If only startDate provided
    }
  
    return this.assetFundamentalsRepository.find({
      where,
      relations: ['metric'],
    });
  }

  async findOneFundamental(id: number): Promise<AssetFundamentalsEntity | AssetMetricsEntity> {
    const fundamental = await this.assetFundamentalsRepository.findOne({
      where: { id: id },
      relations: ['metric'],
    });
  
    if (!fundamental) {
      throw new NotFoundException('Fundamental not found');
    }

    return {
      ...fundamental,
      metric: fundamental.metric?.metric, 
    };
  }

  async updateFundamental(id: number, dto: AssetFundamentalsDto): Promise<AssetFundamentalsEntity> {
    const fundamental = await this.assetFundamentalsRepository.findOne({ where: { id: id } });
  
    if (!fundamental) {
      throw new NotFoundException('Fundamental not found');
    }
  
    const metric = await this.assetMetricsRepository.findOne({
      where: { metric: dto.metric }, 
    });
  
    if (!metric) {
      throw new NotFoundException('Metric not found');
    }
    Object.assign(fundamental, dto);
    fundamental.metric = metric; 
  
    await this.assetFundamentalsRepository.save(fundamental);
  
    return this.assetFundamentalsRepository.findOne({
      where: { id: id },
      relations: ['metric'],
    });
  }
  

  async removeFundamental(id: string): Promise<{ message: string }> {
    const deleteResult = await this.assetFundamentalsRepository.delete(id);
  
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Fundamental with ID ${id} not found.`);
    }
  
    return { message: `Fundamental with ID ${id} has been deleted successfully.` };
  }

}