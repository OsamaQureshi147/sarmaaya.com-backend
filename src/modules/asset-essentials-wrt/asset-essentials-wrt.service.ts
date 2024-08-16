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

  async findOneWithoutRealTime(id: string): Promise<AssetEssentialsWithoutRealTimeEntity> {
    const findOneWrt = await this.assetEssentialsWithoutRealTimeRepository.findOne({ where: { isin: id } });

    if (!findOneWrt) {
      throw new NotFoundException(`Asset with ISIN ${id} not found.`);
    }

    return findOneWrt;
  }

  async updateWithoutRealTime(isin: string, dto: AssetEssentialsDto): Promise<AssetEssentialsWithoutRealTimeEntity> {
    if (!isin) {
      throw new BadRequestException('ID must be provided.');
    }
  
    const updateResult = await this.assetEssentialsWithoutRealTimeRepository.update({ isin:isin }, dto);
  
    if (updateResult.affected === 0) {
      throw new NotFoundException(`Asset with isin ${isin} not found.`);
    }
  
    return this.findOneWithoutRealTime(isin);
  }

  async removeWithoutRealTime(id: number): Promise<{ message: string }> {
    const deleteResult = await this.assetEssentialsWithoutRealTimeRepository.delete(id);;
  
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Asset Segment with id ${id} not found.`);
    }
  
    return { message: `Asset Essential with id ${id} has been deleted successfully.` };
  }

}
