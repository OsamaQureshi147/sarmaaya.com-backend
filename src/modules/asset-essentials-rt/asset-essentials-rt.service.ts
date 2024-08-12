import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AssetEssentialsDto, AssetEssentialsRealTimeEntity} from 'lib-typeorm';


@Injectable()
export class AssetEssentialsRtService {
  constructor(
    @InjectRepository(AssetEssentialsRealTimeEntity)
    private readonly assetEssentialsRealTimeRepository: Repository<AssetEssentialsRealTimeEntity>
  ) {}

  
  async createRealTime(dto: AssetEssentialsDto): Promise<AssetEssentialsRealTimeEntity> {
    const entity = this.assetEssentialsRealTimeRepository.create(dto);
    return this.assetEssentialsRealTimeRepository.save(entity);
  }

  async findAllRealTime(query: any): Promise<AssetEssentialsRealTimeEntity[]> {
    const queryBuilder = this.assetEssentialsRealTimeRepository.createQueryBuilder('asset_essentials_rt_rt');
    
    if (query.isin) {
      queryBuilder.andWhere('asset_essentials_rt.isin = :isin', { isin: query.isin });
    }

    if (query.symbol) {
      queryBuilder.andWhere('asset_essentials_rt.symbol LIKE :symbol', { symbol: `%${query.symbol}%` });
    }

    if (query.price) {
      queryBuilder.andWhere('asset_essentials_rt.price = :price', { price: query.price });
    }

    if (query.high) {
      queryBuilder.andWhere('asset_essentials_rt.high = :high', { high: query.high });
    }

    if (query.low) {
      queryBuilder.andWhere('asset_essentials_rt.low = :low', { low: query.low });
    }

    if (query.annualChangePercent) {
      queryBuilder.andWhere('asset_essentials_rt.annualChangePercent = :annualChangePercent', { annualChangePercent: query.annualChangePercent });
    }

    if (query.yearToDateChangePercent) {
      queryBuilder.andWhere('asset_essentials_rt.yearToDateChangePercent = :yearToDateChangePercent', { yearToDateChangePercent: query.yearToDateChangePercent });
    }

    if (query.volume) {
      queryBuilder.andWhere('asset_essentials_rt.volume = :volume', { volume: query.volume });
    }

    if (query.changePercent) {
      queryBuilder.andWhere('asset_essentials_rt.changePercent = :changePercent', { changePercent: query.changePercent });
    }

    if (query.marketCap) {
      query.Builder.andWhere('asset_essentials_rt.marketCap = :marketCap', {marketCap: query.marketCap})
    }

    return queryBuilder.getMany();
  }


  async findOneRealTime(isin: string): Promise<AssetEssentialsRealTimeEntity> {

    const oneRealTime = await this.assetEssentialsRealTimeRepository.findOne({where : {isin: isin}})
    if (!oneRealTime){
      throw new NotFoundException(`AssetEssential with isin ${isin} not found.`);
    }
    
    return oneRealTime;
  }

  async updateRealTime(isin: string, dto: AssetEssentialsDto): Promise<AssetEssentialsRealTimeEntity> {

   const updaterealTime =  await this.assetEssentialsRealTimeRepository.update(isin, dto);

   if (updaterealTime.affected === 0) {
    throw new NotFoundException(`Asset with id ${isin} not found.`);
  }
    
  return this.findOneRealTime(isin);
  }

  async removeRealTime(id: string): Promise<{ message: string}> {

    const deleteResult = await this.assetEssentialsRealTimeRepository.delete(id);

    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Asset with id ${id} not found.`);
    }
  
    return { message: `Asset with id ${id} has been deleted successfully.` };
  }
}
