import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { AssetDetailsEntity, AssetDetailsDto } from 'lib-typeorm-pro';
import * as fs from 'fs';
import * as csv from 'fast-csv';

@Injectable()
export class AssetDetailsService {
  constructor(
    @InjectRepository(AssetDetailsEntity)
    private readonly assetDetailsRepository: Repository<AssetDetailsEntity>,
  ) {}

  async create(assetDetailsDto: AssetDetailsDto): Promise<AssetDetailsEntity> {
    const assetDetails = this.assetDetailsRepository.create(assetDetailsDto);
    return this.assetDetailsRepository.save(assetDetails);
  }

  async findAll(query: AssetDetailsEntity): Promise<AssetDetailsEntity[]> {
    const where: FindOptionsWhere<AssetDetailsEntity> = {};

    Object.keys(query).forEach((key) => {
      const value = query[key];
      if (value !== undefined && value !== null) {
        where[key] = value;
      }
    });

    return await this.assetDetailsRepository.find({ where });
  }

  async findOne(isin: string): Promise<AssetDetailsEntity> {
    const asset = await this.assetDetailsRepository.findOne({
      where: { isin: isin },
    });

    if (!asset) {
      throw new NotFoundException(`Asset with ISIN ${isin} not found.`);
    }

    return asset;
  }

  async update(
    isin: string,
    assetDetailsDto: AssetDetailsDto,
  ): Promise<AssetDetailsEntity> {
    const updateResult = await this.assetDetailsRepository.update(
      isin,
      assetDetailsDto,
    );

    if (updateResult.affected === 0) {
      throw new NotFoundException(`Asset with ISIN ${isin} not found.`);
    }

    return this.findOne(isin);
  }

  async remove(isin: string): Promise<{ message: string }> {
    const deleteResult = await this.assetDetailsRepository.delete(isin);

    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Asset with ISIN ${isin} not found.`);
    }

    return {
      message: `Asset with ISIN ${isin} has been deleted successfully.`,
    };
  }
  
  async importCSVAndUpdateTradingNames(filePath: string): Promise<void> {
    const fileStream = fs.createReadStream(filePath);

    fileStream.pipe(csv.parse({ headers: true }))
      .on('data', async (row) => {
        const { isin, trading_name } = row;

        // Find the asset by ISIN
        const asset = await this.assetDetailsRepository.findOne({ where: { isin } });

        if (asset) {
          // Update the trading_name for the found ISIN
          asset.tradingName = trading_name;
          await this.assetDetailsRepository.save(asset);
        } else {
          // Handle case where ISIN is not found (Optional)
          console.warn(`ISIN ${isin} not found in the database.`);
        }
      })
      .on('end', () => {
        console.log('CSV file successfully processed and database updated');
      })
      .on('error', (error) => {
        console.error('Error processing CSV file', error);
      });
  }
  
}
