import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AssetDetailsEntity } from 'lib-typeorm';
import { AssetDetailsDto } from 'lib-typeorm';

@Injectable()
export class AssetDetailsService {
  constructor(
    @InjectRepository(AssetDetailsEntity)
    private readonly assetDetailsRepository: Repository<AssetDetailsEntity>,
  ) {}

  async create(assetDetailsDto: AssetDetailsDto): Promise<AssetDetailsEntity> {
    const assetDetails = this.assetDetailsRepository.create(assetDetailsDto);
    return this.assetDetailsRepository.save(assetDetails);
  }

  async findAll(): Promise<AssetDetailsEntity[]> {
    return this.assetDetailsRepository.find();
  }

  async findOne(id: string): Promise<AssetDetailsEntity> {
    return this.assetDetailsRepository.findOne({ where: { isin: id } });
  }

  async update(id: string, assetDetailsDto: AssetDetailsDto): Promise<AssetDetailsEntity> {
    await this.assetDetailsRepository.update(id, assetDetailsDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.assetDetailsRepository.delete(id);
  }
}
