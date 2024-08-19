import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual} from 'typeorm';
import { AssetEssentialsDto, AssetEssentialsRealTimeEntity, AssetEssentialsWithoutRealTimeEntity} from 'lib-typeorm';


@Injectable()
export class AssetEssentialsRtService {
  constructor(
    @InjectRepository(AssetEssentialsRealTimeEntity)
    private readonly assetEssentialsRealTimeRepository: Repository<AssetEssentialsRealTimeEntity>,
    @InjectRepository(AssetEssentialsRealTimeEntity)
    private readonly assetEssentialsWithoutRealTimeRepository: Repository<AssetEssentialsWithoutRealTimeEntity>
  ) {}

  async createRealTime(dto: AssetEssentialsDto): Promise<AssetEssentialsRealTimeEntity> {
    const entity = this.assetEssentialsRealTimeRepository.create(dto);
    return this.assetEssentialsRealTimeRepository.save(entity);
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
  

  async removeRealTime(id: number): Promise<{ message: string}> {

    const deleteResult = await this.assetEssentialsRealTimeRepository.delete(id);

    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Asset with id ${id} not found.`);
    }
  
    return { message: `Asset with id ${id} has been deleted successfully.` };
  }

  async findLatestByIsin(isin: string): Promise<AssetEssentialsRealTimeEntity> {
    try {
      const latestData = await this.assetEssentialsRealTimeRepository.findOne({
        where: { isin },
        order: { created_at: 'DESC' },  
      });
  
      if (!latestData) {
        throw new NotFoundException(`No data found for ISIN: ${isin}`);
      }
      return latestData;
    } catch (error) {
      console.error('Service: Error during query execution:', error.message);
      throw error;
    }
  }

  async findByIsinAndDays(isin: string, days: number | null): Promise<AssetEssentialsRealTimeEntity[]> {
    const whereClause: any = { isin };
  
    if (days !== null) {
      const now = new Date();
      const startDate = new Date(now);
      startDate.setDate(now.getDate() - days);
  
      whereClause.created_at = MoreThanOrEqual(startDate);
    }
  
    return this.assetEssentialsRealTimeRepository.find({
      where: whereClause,
      order: { created_at: 'DESC' },
    });
  }

  // async findByIsinAndDays(
  //   isin: string, 
  //   days: number, 
  //   isWrt: boolean = false
  // ): Promise<AssetEssentialsRealTimeEntity[] | AssetEssentialsWithoutRealTimeEntity[]> {
  //   const whereClause: any = { isin };
  //   const now = new Date();
  //   const startDate = new Date(now);
  //   startDate.setDate(now.getDate() - days);
  //   whereClause.created_at = MoreThanOrEqual(startDate);

  //   if (isWrt) {
  //     return this.assetEssentialsWithoutRealTimeRepository.find({
  //       where: whereClause,
  //       order: { created_at: 'DESC' },
  //     });
  //   } else {
  //     return this.assetEssentialsRealTimeRepository.find({
  //       where: whereClause,
  //       order: { created_at: 'DESC' },
  //     });
  //   }
  // }


  async findLatestDataByIsins(): Promise<AssetEssentialsRealTimeEntity[]> {
    const query = `
      SELECT DISTINCT ON (isin) *
      FROM asset_essentials_rt
      ORDER BY isin, created_at DESC;
    `;
  
    const latestIsinsData = await this.assetEssentialsRealTimeRepository.query(query);
    
    return latestIsinsData;
  }
}

