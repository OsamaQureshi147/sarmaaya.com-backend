import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AssetEssentialsRealTimeEntity, AssetEssentialsWithoutRealTimeEntity } from 'lib-typeorm';

@Injectable()
export class AssetEssentialsRtJobService {
  constructor(
    @InjectQueue('real-time-data-queue') private readonly realTimeDataQueue: Queue,
    @InjectRepository(AssetEssentialsRealTimeEntity)
    private readonly rtRepository: Repository<AssetEssentialsRealTimeEntity>,
    @InjectRepository(AssetEssentialsWithoutRealTimeEntity)
    private readonly wrtRepository: Repository<AssetEssentialsWithoutRealTimeEntity>,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron() {
    try {
      console.log(`[${new Date().toISOString()}] Cron job started for bulk data generation`);

      const bulkData = await this.generateBulkRealTimeData();

      await this.realTimeDataQueue.add('processRealTimeData', bulkData);

      console.log(`Bulk data added to queue at ${new Date().toISOString()}`);
    } catch (error) {
      console.error('Error in cron job:', error);
    }
  }

  
  async runEodJob() {
    try {
      console.log(`[${new Date().toISOString()}] EOD job triggered`);

      const isins = await this.rtRepository
        .createQueryBuilder('asset')
        .select('DISTINCT(asset.isin)', 'isin') 
        .getRawMany();

      console.log('Fetched ISINs:', isins);

      for (const record of isins) {  
        const isin = record.isin; 
        if (!isin) {
          console.log('ISIN is undefined, skipping...');
          continue;
        }

        console.log(`Processing EOD for ISIN: ${isin}`);

        const eodData = await this.rtRepository.findOne({
          where: { isin },
          order: { created_at: 'DESC' },  
        });

        if (eodData) {
          await this.wrtRepository.save({
            isin: eodData.isin,
            symbol: eodData.symbol,
            price: eodData.price,
            high: eodData.high,
            low: eodData.low,
            annualChangePercent: eodData.annualChangePercent,
            yearToDateChangePercent: eodData.yearToDateChangePercent,
            volume: eodData.volume,
            changePercent: eodData.changePercent,
            marketCap: eodData.marketCap,
          });

          await this.rtRepository.delete({ isin });
          console.log(`Processed and deleted EOD data for ISIN ${isin}`);
        } else {
          console.log(`No EOD data found for ISIN ${isin}`);
        }
      }

      console.log('EOD process completed.');
    } catch (error) {
      console.error('Error in EOD job:', error);
    }
  }

  async deleteRtData(): Promise<void> {
    try {
      await this.rtRepository.clear();
      console.log('All data deleted from the RT table.');
    } catch (error) {
      console.error('Error deleting data from the RT table:', error);
      throw error;
    }
  }

  private async generateBulkRealTimeData(): Promise<AssetEssentialsRealTimeEntity[]> {
    const randomData: AssetEssentialsRealTimeEntity[] = [];

    const isin = "SA0007879832"; 
    for (let i = 1; i <= 5; i++) { 
      const symbol = `SYMB${i}`;
      const price = this.getRandomInteger(90, 110);  
      const high = price + this.getRandomInteger(0, 5); 
      const low = price - this.getRandomInteger(0, 5);  
      const annualChangePercent = this.getRandomInteger(-10, 10);  
      const yearToDateChangePercent = this.getRandomInteger(-5, 5);  
      const volume = this.getRandomInteger(100, 1000);  
      const changePercent = this.getRandomInteger(-1, 1);  
      const marketCap = this.getRandomInteger(50000, 100000);  

      randomData.push({
        isin,
        symbol,
        price,
        high,
        low,
        annualChangePercent,
        yearToDateChangePercent,
        volume,
        changePercent,
        marketCap,
      } as AssetEssentialsRealTimeEntity);
    }

    return randomData;
  }

  private getRandomInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
