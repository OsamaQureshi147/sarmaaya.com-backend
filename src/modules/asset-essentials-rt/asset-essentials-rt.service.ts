import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
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

  async findAllRealTime(query: AssetEssentialsRealTimeEntity): Promise<AssetEssentialsRealTimeEntity[]> {
    const where: FindOptionsWhere<AssetEssentialsRealTimeEntity> = {};
  
    Object.keys(query).forEach(key => {
      const value = query[key];
      if (value !== undefined && value !== null) {
        where[key] = value;
      }
    });
  
    return await this.assetEssentialsRealTimeRepository.find({ where });
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
