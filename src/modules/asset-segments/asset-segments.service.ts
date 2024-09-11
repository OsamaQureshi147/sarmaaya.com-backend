import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { AssetSegmentsEntity, AssetSegmentsDto } from 'lib-typeorm';
import { SegmentsApi, FundamentalsRequest } from '@factset/sdk-factsetfundamentals';
import { InternalServerErrorException } from '@nestjs/common';
import { AssetDetailsEntity } from 'lib-typeorm';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';



@Injectable()
export class AssetSegmentsService {
  private segmentsApi: SegmentsApi; 
  constructor(
    @InjectRepository(AssetSegmentsEntity)
    private readonly assetSegmentsRepository: Repository<AssetSegmentsEntity>,
    @InjectRepository(AssetDetailsEntity)
    private readonly assetDetailsRepository: Repository<AssetDetailsEntity>,
    private readonly configService: ConfigService
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


  async getSegmentsAndSave(): Promise<void> {
    try {
      
      const assetDetails = await this.assetDetailsRepository.find({
        select: ['isin'],
      });
      const isins = assetDetails.map((detail) => detail.isin);

      if (isins.length === 0) {
        throw new NotFoundException('No ISINs found in the asset_details table');
      }

      const username = this.configService.get<string>('FACTSET_USERNAME');
      const password = this.configService.get<string>('FACTSET_PASSWORD');

      if (!username || !password) {
        throw new InternalServerErrorException('FactSet credentials are missing');
      }

      
      const requestPayload: FundamentalsRequest = {
        data: {
          ids: isins,  
          periodicity: 'ANN',  
          fiscalPeriod: {
            start: '2023-09-10', 
            end: '2024-09-10'     
          },
          metrics: 'CAPEX',       
          segmentType: 'GEO'      
        }

      };

      console.log(requestPayload)

     

      const response = await axios.post(
        'https://api.factset.com/content/factset-fundamentals/v2/segments',  
        requestPayload,
        {
          auth: {
            username,  
            password,
          },
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
     
      if (response.status === 200) {
        const excelData = response.data;
        const parsedData = this.parseSegmentData(excelData);

        
        await this.saveParsedData(parsedData);
      } else if (response.status === 202) {
        console.log('Batch processing: ', response.data);
      } else {
        throw new InternalServerErrorException('Unexpected response from the API');
      }
    } catch (err) {
      console.error('Error Message', err?.response?.data || err?.message);
      throw new InternalServerErrorException(err?.response?.data || 'Error while fetching segments');
    }
  }

  
  private parseSegmentData(apiResponse: any): Partial<AssetSegmentsEntity>[] {
    
    console.log(apiResponse)
    const segments = Array.isArray(apiResponse.data) ? apiResponse.data : [];
  
    if (!segments.length) {
      console.error("No segments found in the response.");
      return [];
    }
  
    
    return segments.map((item) => {
      const { label, requestId: isin, value, metric } = item;
  
      return {
        label,
        isin,  
        metric,  
        segmentType: 'GEO',  
        periodicity: 'ANN',  
        value: value?.value || value,  
        created_at: new Date(),
        updated_at: new Date(),
      }
    })
  }
  private async saveParsedData(parsedData: Partial<AssetSegmentsEntity>[]): Promise<void> {
    const entities = parsedData.map(data => this.assetSegmentsRepository.create(data));  
    await this.assetSegmentsRepository.save(entities);  
  }

  
}
