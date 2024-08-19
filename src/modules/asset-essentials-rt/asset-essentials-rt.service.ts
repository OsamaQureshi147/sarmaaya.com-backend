import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual} from 'typeorm';
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
  
  
  async findLatestByIsin(isin: string): Promise<AssetEssentialsRealTimeEntity> {
    const latestData = await this.assetEssentialsRealTimeRepository.findOne({
      //where: { isin },
      order: { created_at: 'DESC' },
    });

    if (!latestData) {
      throw new NotFoundException(`No data found for ISIN: ${isin}`);
    }

    return latestData;
  }
  
  async findByIsinAndDays(isin: string, days: number | null): Promise<AssetEssentialsRealTimeEntity[]> {
    const whereClause: any = { isin };
  
    if (days !== null) {
      const now = new Date();
      const startDate = new Date(now);
      startDate.setDate(now.getDate() - days);
  
      whereClause.created_at = MoreThanOrEqual(startDate);
    }
  
    const data = await this.assetEssentialsRealTimeRepository.find({
      where: whereClause,
    });
  
    if (!data.length) {
      throw new NotFoundException(`No data found for ISIN: ${isin}${days !== null ? ` in the last ${days} days` : ''}.`);
    }
  
    return data;
  }
  
  
  async findAllLatestIsins(days: number | null): Promise<AssetEssentialsRealTimeEntity[]> {
    const now = new Date();
    let whereClause = '';
  
    if (days !== null) {
      const startDate = new Date(now);
      startDate.setDate(now.getDate() - days);
      whereClause = `WHERE created_at >= '${startDate.toISOString()}'`;
    }
  
    const query = `
      SELECT DISTINCT ON (isin) *
      FROM asset_essentials_rt
      ${whereClause}
      ORDER BY isin, created_at DESC;
    `;
  
    const isins = await this.assetEssentialsRealTimeRepository.query(query);
  
    if (!isins.length) {
      throw new NotFoundException('No ISINs found.');
    }
  
    return isins;
  }
  async findAllRealTime(): Promise<AssetEssentialsRealTimeEntity[]> {
    return this.assetEssentialsRealTimeRepository.find();
  }


  async findOneRealTime(id: number): Promise<AssetEssentialsRealTimeEntity> {

    const oneRealTime = await this.assetEssentialsRealTimeRepository.findOne({where : {id: id}})
    if (!oneRealTime){
      throw new NotFoundException(`AssetEssential with id ${id} not found.`);
    }
    
    return oneRealTime;
  }

  async updateRealTime(id: number, dto: AssetEssentialsDto): Promise<AssetEssentialsRealTimeEntity> {
    const realTimeEntity = await this.assetEssentialsRealTimeRepository.findOne({where: {id:id}});
  
    if (!realTimeEntity) {
      throw new NotFoundException(`Asset with id ${id} not found.`);
    }
  
    Object.assign(realTimeEntity, dto);
  
    await this.assetEssentialsRealTimeRepository.save(realTimeEntity);
    return realTimeEntity;
  }
  

  async removeRealTime(id: string): Promise<{ message: string}> {

    const deleteResult = await this.assetEssentialsRealTimeRepository.delete(id);

    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Asset with id ${id} not found.`);
    }
  
    return { message: `Asset with id ${id} has been deleted successfully.` };
  }
}
