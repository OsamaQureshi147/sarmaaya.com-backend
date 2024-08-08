import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AssetEssentialsRealTimeEntity } from 'lib-typeorm';
import { AssetEssentialsWithoutRealTimeEntity } from 'lib-typeorm';
import { AssetFundamentalsDto } from 'lib-typeorm';

@Injectable()
export class AssetEssentialsService {
  constructor(
    @InjectRepository(AssetEssentialsRealTimeEntity)
    private readonly assetEssentialsRealTimeRepository: Repository<AssetEssentialsRealTimeEntity>,
    @InjectRepository(AssetEssentialsWithoutRealTimeEntity)
    private readonly assetEssentialsWithoutRealTimeRepository: Repository<AssetEssentialsWithoutRealTimeEntity>,
  ) {}

  
  async createRealTime(dto: AssetFundamentalsDto): Promise<AssetEssentialsRealTimeEntity> {
    const entity = this.assetEssentialsRealTimeRepository.create(dto);
    return this.assetEssentialsRealTimeRepository.save(entity);
  }

  async findAllRealTime(): Promise<AssetEssentialsRealTimeEntity[]> {
    return this.assetEssentialsRealTimeRepository.find();
  }

  async findOneRealTime(id: string): Promise<AssetEssentialsRealTimeEntity> {
    return this.assetEssentialsRealTimeRepository.findOne({ where: { isin: id } });
  }

  async updateRealTime(id: string, dto: AssetFundamentalsDto): Promise<AssetEssentialsRealTimeEntity> {
    await this.assetEssentialsRealTimeRepository.update(id, dto);
    return this.findOneRealTime(id);
  }

  async removeRealTime(id: string): Promise<void> {
    await this.assetEssentialsRealTimeRepository.delete(id);
  }

  
  async createWithoutRealTime(dto: AssetFundamentalsDto): Promise<AssetEssentialsWithoutRealTimeEntity> {
    const entity = this.assetEssentialsWithoutRealTimeRepository.create(dto);
    return this.assetEssentialsWithoutRealTimeRepository.save(entity);
  }

  async findAllWithoutRealTime(): Promise<AssetEssentialsWithoutRealTimeEntity[]> {
    return this.assetEssentialsWithoutRealTimeRepository.find();
  }

  async findOneWithoutRealTime(id: string): Promise<AssetEssentialsWithoutRealTimeEntity> {
    return this.assetEssentialsWithoutRealTimeRepository.findOne({ where: { isin: id } });
  }

  async updateWithoutRealTime(id: string, dto: AssetFundamentalsDto): Promise<AssetEssentialsWithoutRealTimeEntity> {
    await this.assetEssentialsWithoutRealTimeRepository.update(id, dto);
    return this.findOneWithoutRealTime(id);
  }

  async removeWithoutRealTime(id: string): Promise<void> {
    await this.assetEssentialsWithoutRealTimeRepository.delete(id);
  }
}
