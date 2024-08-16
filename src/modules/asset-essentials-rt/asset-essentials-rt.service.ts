import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, MoreThanOrEqual, LessThanOrEqual } from 'typeorm';
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
