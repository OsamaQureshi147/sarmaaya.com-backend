import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AssetSegmentsEntity } from 'lib-typeorm';
import { AssetSegmentsDto } from 'lib-typeorm';

@Injectable()
export class AssetSegmentsService {
  constructor(
    @InjectRepository(AssetSegmentsEntity)
    private readonly assetSegmentsRepository: Repository<AssetSegmentsEntity>,
  ) {}

  async create(assetSegmentsDto: AssetSegmentsDto): Promise<AssetSegmentsEntity> {
    const assetSegment = this.assetSegmentsRepository.create(assetSegmentsDto);
    return this.assetSegmentsRepository.save(assetSegment);
  }

  async findAll(): Promise<AssetSegmentsEntity[]> {
    return this.assetSegmentsRepository.find();
  }

  async findOne(id: string): Promise<AssetSegmentsEntity> {
    return this.assetSegmentsRepository.findOne({ where: { isin: id } });
  }

  async update(id: string, assetSegmentsDto: AssetSegmentsDto): Promise<AssetSegmentsEntity> {
    await this.assetSegmentsRepository.update(id, assetSegmentsDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.assetSegmentsRepository.delete(id);
  }
}
