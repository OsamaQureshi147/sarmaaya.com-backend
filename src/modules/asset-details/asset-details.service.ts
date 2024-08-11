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

    if (query.companyName) {
      queryBuilder.andWhere('asset_details.companyName LIKE :companyName', { companyName: `%${query.companyName}%` });
    }

    if (query.exchangeId) {
      queryBuilder.andWhere('asset_details.exchangeId = :exchangeId', { exchangeId: query.exchangeId });
    }

    if (query.assetType) {
      queryBuilder.andWhere('asset_details.assetType = :assetType', { assetType: query.assetType });
    }

    if (query.sector) {
      queryBuilder.andWhere('asset_details.sector LIKE :sector', { sector: `%${query.sector}%` });
    }

    if (query.industry) {
      queryBuilder.andWhere('asset_details.industry LIKE :industry', { industry: `%${query.industry}%` });
    }

    if (query.website) {
      queryBuilder.andWhere('asset_details.website LIKE :website', { website: `%${query.website}%` });
    }

    if (query.companySize) {
      queryBuilder.andWhere('asset_details.companySize = :companySize', { companySize: query.companySize });
    }

    if (query.about) {
      queryBuilder.andWhere('asset_details.about LIKE :about', { about: `%${query.about}%` });
    }

    if (query.isShariah !== undefined) {
      queryBuilder.andWhere('asset_details.isShariah = :isShariah', { isShariah: query.isShariah });
    }

    if (query.created_at) {
      queryBuilder.andWhere('asset_details.created_at = :created_at', { created_at: query.created_at });
    }

    if (query.updated_at) {
      queryBuilder.andWhere('asset_details.updated_at = :updated_at', { updated_at: query.updated_at });
    }

    return queryBuilder.getMany();
}



  async findOne(isin: string): Promise<AssetDetailsEntity> {
    return this.assetDetailsRepository.findOne({ where: { isin: isin } });
  }

  async update(isin: string, assetDetailsDto: AssetDetailsDto): Promise<AssetDetailsEntity> {
    await this.assetDetailsRepository.update(isin , assetDetailsDto);
    return this.findOne(isin);
  }

  async remove(isin: string): Promise<void> {
    await this.assetDetailsRepository.delete(isin);
  }
}
