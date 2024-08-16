import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { AssetEssentialsDto, AssetEssentialsWithoutRealTimeEntity, AssetFundamentalsDto } from 'lib-typeorm';


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


  async findAllWithoutRealTime(query: AssetEssentialsWithoutRealTimeEntity): Promise<AssetEssentialsWithoutRealTimeEntity[]> {
    const where: FindOptionsWhere<AssetEssentialsWithoutRealTimeEntity> = {};
  
    Object.keys(query).forEach(key => {
      const value = query[key];
      if (value !== undefined && value !== null) {
        where[key] = value;
      }
    });
  
    return await this.assetEssentialsWithoutRealTimeRepository.find({ where });
  }

  async findOneWithoutRealTime(id: number): Promise<AssetEssentialsWithoutRealTimeEntity> {
    const findOneWrt = await this.assetEssentialsWithoutRealTimeRepository.findOne({ where: { id: id } });

    if (!findOneWrt) {
      throw new NotFoundException(`Asset with id ${id} not found.`);
    }

    return findOneWrt;
  }

  async updateWithoutRealTime(id: number, dto: AssetEssentialsDto): Promise<AssetEssentialsWithoutRealTimeEntity> {
    if (!id) {
      throw new BadRequestException('ID must be provided.');
    }
  
    const updateResult = await this.assetEssentialsWithoutRealTimeRepository.update({ id:id }, dto);
  
    if (updateResult.affected === 0) {
      throw new NotFoundException(`Asset with id ${id} not found.`);
    }
  
    return this.findOneWithoutRealTime(id);
  }

  async removeWithoutRealTime(id: number): Promise<{ message: string }> {
    const deleteResult = await this.assetEssentialsWithoutRealTimeRepository.delete(id);;
  
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Asset Segment with id ${id} not found.`);
    }
  
    return { message: `Asset Essential with id ${id} has been deleted successfully.` };
  }

}
