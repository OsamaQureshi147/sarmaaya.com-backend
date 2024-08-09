import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AssetDetailsEntity, AssetDetailsDto } from 'lib-typeorm';

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

  async findAll(query: any): Promise<AssetDetailsEntity[]> {
    const queryBuilder = this.assetDetailsRepository.createQueryBuilder('asset_details');
    
    if (query.isin) {
      queryBuilder.andWhere('asset_details.isin = :isin', { isin: query.isin });
    }

    if (query.sector) {
      queryBuilder.andWhere('asset_details.sector LIKE :sector', { sector: `%${query.sector}%` });
    }

    if (query.industry) {
      queryBuilder.andWhere('asset_details.industry = :industry', { industry: `%${query.industry}%` });
    }

    if (query.assetType) {
      queryBuilder.andWhere('asset_details.assetType = :assetType', { assetType: `%${query.assetType}%` });
    }

    if (query.website) {
      queryBuilder.andWhere('asset_details.website = :website', { website: `%${query.website}` });
    }

    if (query.companySize) {
      queryBuilder.andWhere('asset_details.companySize = :companySize', { companySize: query.companySize });
    }

    if (query.about) {
      queryBuilder.andWhere('asset_details.about = :about', { about: query.about });
    }

    if (query.isShariah) {
      queryBuilder.andWhere('asset_details.isShariah = :isShariah', { volume: query.isShariah });
    }

    return queryBuilder.getMany();
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
