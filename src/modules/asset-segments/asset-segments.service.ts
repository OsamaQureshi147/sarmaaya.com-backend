import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { AssetSegmentsEntity, AssetSegmentsDto } from 'lib-typeorm';


@Injectable()
export class AssetSegmentsService {
  constructor(
    @InjectRepository(AssetSegmentsEntity)
    private readonly assetSegmentsRepository: Repository<AssetSegmentsEntity>,
  ) {}

  async create(assetSegmentsDto: AssetSegmentsDto): Promise<AssetSegmentsEntity> {
    const assetSegment = this.assetSegmentsRepository.create(assetSegmentsDto);
    return this.assetSegmentsRepository.save(assetSegment);
  }

  async findAllSegments(query: AssetSegmentsEntity): Promise<AssetSegmentsEntity[]> {
    const where: FindOptionsWhere<AssetSegmentsEntity> = {};
  
    Object.keys(query).forEach(key => {
      const value = query[key];
      if (value !== undefined && value !== null) {
        where[key] = value;
      }
    });
  
    return await this.assetSegmentsRepository.find({ where });
  }

  async findOne(id: string): Promise<AssetSegmentsEntity> {
    return this.assetSegmentsRepository.findOne({ where: { isin: id } });
  }

  async update(isin: string, assetSegmentsDto: AssetSegmentsDto): Promise<AssetSegmentsEntity> {
    await this.assetSegmentsRepository.update({ isin }, assetSegmentsDto);
    const updatedEntity = await this.assetSegmentsRepository.findOne({ where: { isin } });
  
    if (!updatedEntity) {
      throw new NotFoundException(`Asset Segment with ISIN ${isin} not found.`);
    }
  
    return updatedEntity;
  }
  

  async remove(isin: string): Promise<{ message: string }> {
    const deleteResult = await this.assetSegmentsRepository.delete({ isin });
  
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Asset Segment with ISIN ${isin} not found.`);
    }
  
    return { message: `Asset Segment with ISIN ${isin} has been deleted successfully.` };
  }
}
