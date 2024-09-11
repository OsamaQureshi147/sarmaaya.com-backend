// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { AssetEssentialsRealTimeEntity } from 'lib-typeorm';
// import { AssetEssentialsWithoutRealTimeEntity } from 'lib-typeorm';
// import { AssetFundamentalsDto } from 'lib-typeorm';

// @Injectable()
// export class AssetEssentialsService {
//   constructor(
//     @InjectRepository(AssetEssentialsRealTimeEntity)
//     private readonly assetEssentialsRealTimeRepository: Repository<AssetEssentialsRealTimeEntity>,
//     @InjectRepository(AssetEssentialsWithoutRealTimeEntity)
//     private readonly assetEssentialsWithoutRealTimeRepository: Repository<AssetEssentialsWithoutRealTimeEntity>,
//   ) {}

//   async createRealTime(dto: AssetFundamentalsDto): Promise<AssetEssentialsRealTimeEntity> {
//     const entity = this.assetEssentialsRealTimeRepository.create(dto);
//     return this.assetEssentialsRealTimeRepository.save(entity);
//   }

//   async findAllRealTime(query: any): Promise<AssetEssentialsRealTimeEntity[]> {
//     const queryBuilder = this.assetEssentialsRealTimeRepository.createQueryBuilder('asset_essentials_rt_rt');

//     if (query.isin) {
//       queryBuilder.andWhere('asset_essentials_rt.isin = :isin', { isin: query.isin });
//     }

//     if (query.symbol) {
//       queryBuilder.andWhere('asset_essentials_rt.symbol LIKE :symbol', { symbol: `%${query.symbol}%` });
//     }

//     if (query.price) {
//       queryBuilder.andWhere('asset_essentials_rt.price = :price', { price: query.price });
//     }

//     if (query.high) {
//       queryBuilder.andWhere('asset_essentials_rt.high = :high', { high: query.high });
//     }

//     if (query.low) {
//       queryBuilder.andWhere('asset_essentials_rt.low = :low', { low: query.low });
//     }

//     if (query.annualChangePercent) {
//       queryBuilder.andWhere('asset_essentials_rt.annualChangePercent = :annualChangePercent', { annualChangePercent: query.annualChangePercent });
//     }

//     if (query.yearToDateChangePercent) {
//       queryBuilder.andWhere('asset_essentials_rt.yearToDateChangePercent = :yearToDateChangePercent', { yearToDateChangePercent: query.yearToDateChangePercent });
//     }

//     if (query.volume) {
//       queryBuilder.andWhere('asset_essentials_rt.volume = :volume', { volume: query.volume });
//     }

//     if (query.changePercent) {
//       queryBuilder.andWhere('asset_essentials_rt.changePercent = :changePercent', { changePercent: query.changePercent });
//     }

//     if (query.marketCap) {
//       query.Builder.andWhere('asset_essentials_rt.marketCap = :marketCap', {marketCap: query.marketCap})
//     }

//     return queryBuilder.getMany();
//   }

//   async findOneRealTime(id: string): Promise<AssetEssentialsRealTimeEntity> {
//     return this.assetEssentialsRealTimeRepository.findOne({ where: { isin: id } });
//   }

//   async updateRealTime(id: string, dto: AssetFundamentalsDto): Promise<AssetEssentialsRealTimeEntity> {
//     await this.assetEssentialsRealTimeRepository.update(id, dto);
//     return this.findOneRealTime(id);
//   }

//   async removeRealTime(id: string): Promise<void> {
//     await this.assetEssentialsRealTimeRepository.delete(id);
//   }

//   async createWithoutRealTime(dto: AssetFundamentalsDto): Promise<AssetEssentialsWithoutRealTimeEntity> {
//     const entity = this.assetEssentialsWithoutRealTimeRepository.create(dto);
//     return this.assetEssentialsWithoutRealTimeRepository.save(entity);
//   }

//   // async findAllWithoutRealTime(): Promise<AssetEssentialsWithoutRealTimeEntity[]> {
//   //   return this.assetEssentialsWithoutRealTimeRepository.find();
//   // }

//   async findAllWithoutRealTime(query: any): Promise<AssetEssentialsWithoutRealTimeEntity[]> {
//     const queryBuilder = this.assetEssentialsRealTimeRepository.createQueryBuilder('asset_essentials_wrt');

//     if (query.isin) {
//       queryBuilder.andWhere('asset_essentials_wrt.isin = :isin', { isin: query.isin });
//     }

//     if (query.symbol) {
//       queryBuilder.andWhere('asset_essentials_wrt.symbol LIKE :symbol', { symbol: `%${query.symbol}%` });
//     }

//     if (query.price) {
//       queryBuilder.andWhere('asset_essentials_wrt.price = :price', { price: query.price });
//     }

//     if (query.high) {
//       queryBuilder.andWhere('asset_essentials_wrt.high = :high', { high: query.high });
//     }

//     if (query.low) {
//       queryBuilder.andWhere('asset_essentials_wrt.low = :low', { low: query.low });
//     }

//     if (query.annualChangePercent) {
//       queryBuilder.andWhere('asset_essentials_wrt.annualChangePercent = :annualChangePercent', { annualChangePercent: query.annualChangePercent });
//     }

//     if (query.yearToDateChangePercent) {
//       queryBuilder.andWhere('asset_essentials_wrt.yearToDateChangePercent = :yearToDateChangePercent', { yearToDateChangePercent: query.yearToDateChangePercent });
//     }

//     if (query.volume) {
//       queryBuilder.andWhere('asset_essentials_wrt.volume = :volume', { volume: query.volume });
//     }

//     if (query.changePercent) {
//       queryBuilder.andWhere('asset_essentials_wrt.changePercent = :changePercent', { changePercent: query.changePercent });
//     }

//     if (query.marketCap) {
//       query.Builder.andWhere('asset_essentials_wrt.marketCap = :marketCap', {marketCap: query.marketCap})
//     }

//     return queryBuilder.getMany();
//   }

//   async findOneWithoutRealTime(id: string): Promise<AssetEssentialsWithoutRealTimeEntity> {
//     return this.assetEssentialsWithoutRealTimeRepository.findOne({ where: { isin: id } });
//   }

//   async updateWithoutRealTime(id: string, dto: AssetFundamentalsDto): Promise<AssetEssentialsWithoutRealTimeEntity> {
//     await this.assetEssentialsWithoutRealTimeRepository.update(id, dto);
//     return this.findOneWithoutRealTime(id);
//   }

//   async removeWithoutRealTime(id: string): Promise<void> {
//     await this.assetEssentialsWithoutRealTimeRepository.delete(id);
//   }
// }
