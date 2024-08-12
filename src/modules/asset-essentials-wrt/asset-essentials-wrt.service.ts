import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AssetEssentialsWithoutRealTimeEntity, AssetFundamentalsDto } from 'lib-typeorm';


@Injectable()
export class AssetEssentialsWrtService {
  constructor(
    @InjectRepository(AssetEssentialsWithoutRealTimeEntity)
    private readonly assetEssentialsWithoutRealTimeRepository: Repository<AssetEssentialsWithoutRealTimeEntity>,
  ) {}

  
  async createWithoutRealTime(dto: AssetFundamentalsDto): Promise<AssetEssentialsWithoutRealTimeEntity> {
    const entity = this.assetEssentialsWithoutRealTimeRepository.create(dto);
    return this.assetEssentialsWithoutRealTimeRepository.save(entity);
  }


  async findAllWithoutRealTime(query: any): Promise<AssetEssentialsWithoutRealTimeEntity[]> {
    const queryBuilder = this.assetEssentialsWithoutRealTimeRepository.createQueryBuilder('asset_essentials_wrt');
    
    if (query.isin) {
      queryBuilder.andWhere('asset_essentials_wrt.isin = :isin', { isin: query.isin });
    }

    if (query.symbol) {
      queryBuilder.andWhere('asset_essentials_wrt.symbol LIKE :symbol', { symbol: `%${query.symbol}%` });
    }

    if (query.price) {
      queryBuilder.andWhere('asset_essentials_wrt.price = :price', { price: query.price });
    }

    if (query.high) {
      queryBuilder.andWhere('asset_essentials_wrt.high = :high', { high: query.high });
    }

    if (query.low) {
      queryBuilder.andWhere('asset_essentials_wrt.low = :low', { low: query.low });
    }

    if (query.annualChangePercent) {
      queryBuilder.andWhere('asset_essentials_wrt.annualChangePercent = :annualChangePercent', { annualChangePercent: query.annualChangePercent });
    }

    if (query.yearToDateChangePercent) {
      queryBuilder.andWhere('asset_essentials_wrt.yearToDateChangePercent = :yearToDateChangePercent', { yearToDateChangePercent: query.yearToDateChangePercent });
    }

    if (query.volume) {
      queryBuilder.andWhere('asset_essentials_wrt.volume = :volume', { volume: query.volume });
    }

    if (query.changePercent) {
      queryBuilder.andWhere('asset_essentials_wrt.changePercent = :changePercent', { changePercent: query.changePercent });
    }

    if (query.marketCap) {
      query.Builder.andWhere('asset_essentials_wrt.marketCap = :marketCap', {marketCap: query.marketCap})
    }

    return queryBuilder.getMany();
  }

  async findOneWithoutRealTime(id: string): Promise<AssetEssentialsWithoutRealTimeEntity> {
    return this.assetEssentialsWithoutRealTimeRepository.findOne({ where: { isin: id } });
  }

  async updateWithoutRealTime(isin: string, dto: AssetFundamentalsDto): Promise<AssetEssentialsWithoutRealTimeEntity> {
    await this.assetEssentialsWithoutRealTimeRepository.update(isin, dto);
    return this.findOneWithoutRealTime(isin);
  }

  async removeWithoutRealTime(id: string): Promise<void> {
    await this.assetEssentialsWithoutRealTimeRepository.delete(id);
  }
}
