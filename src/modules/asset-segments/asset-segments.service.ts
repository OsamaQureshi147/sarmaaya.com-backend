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

  async findAll(query: any): Promise<AssetSegmentsEntity[]> {
    const queryBuilder = this.assetSegmentsRepository.createQueryBuilder('asset_segments');
    
    if (query.isin) {
      queryBuilder.andWhere('asset_segments.isin = :isin', { isin: query.isin });
    }

    if (query.label) {
      queryBuilder.andWhere('asset_segments.label LIKE :label', { label: `%${query.label}%` });
    }

    if (query.value) {
      queryBuilder.andWhere('asset_segments.value = :value', { value: query.value });
    }

    if (query.metric) {
      queryBuilder.andWhere('asset_segments.metric = :metric', { metric: query.metric });
    }

    if (query.segmentType) {
      queryBuilder.andWhere('asset_segments.segmentType = :segmentType', { segmentType: query.segmentType });
    }

    if (query.periodicity) {
      queryBuilder.andWhere('asset_segments.periodicity = :periodicity', { periodicity: query.periodicity });
    }

    return queryBuilder.getMany();
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
