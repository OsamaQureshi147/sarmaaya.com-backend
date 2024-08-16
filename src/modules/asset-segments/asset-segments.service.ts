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

  async findOne(id: number): Promise<AssetSegmentsEntity> {
    return this.assetSegmentsRepository.findOne({ where: { id: id } });
  }

  async update(id: number, assetSegmentsDto: AssetSegmentsDto): Promise<AssetSegmentsEntity> {
    await this.assetSegmentsRepository.update({ id }, assetSegmentsDto);
    const updatedEntity = await this.assetSegmentsRepository.findOne({ where: { id} });
  
    if (!updatedEntity) {
      throw new NotFoundException(`Asset Segment with id ${id} not found.`);
    }
  
    return updatedEntity;
  }
  

  async remove(id: number): Promise<{ message: string }> {
    const deleteResult = await this.assetSegmentsRepository.delete({ id });
  
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Asset Segment with id ${id} not found.`);
    }
  
    return { message: `Asset Segment with id ${id} has been deleted successfully.` };
  }
}
