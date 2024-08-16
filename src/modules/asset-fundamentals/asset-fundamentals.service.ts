import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { AssetFundamentalsEntity, AssetMetricsEntity, AssetFundamentalsDto, AssetMetricsDto } from 'lib-typeorm';
import { FindOptionsWhere } from 'typeorm';


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

  async findAllFundamentals(query: AssetFundamentalsEntity): Promise<AssetFundamentalsEntity[]> {
    const where: FindOptionsWhere<AssetFundamentalsEntity> = {};
  
    Object.keys(query).forEach(key => {
      const value = query[key];
      if (value !== undefined && value !== null) {
        where[key] = value;
      }
    });
  
    return await this.assetFundamentalsRepository.find({
      relations: ['metric'],
    });
  }


  async findOneFundamental(id: string): Promise<any> {
    const fundamental = await this.assetFundamentalsRepository.findOne({
      where: { isin: id },
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

  async updateFundamental(id: string, dto: AssetFundamentalsDto): Promise<AssetFundamentalsEntity> {
    const fundamental = await this.assetFundamentalsRepository.findOne({ where: { isin: id } });
  
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
      where: { isin: id },
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