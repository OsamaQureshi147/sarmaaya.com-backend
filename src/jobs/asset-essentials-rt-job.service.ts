import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { AssetEssentialsRtService } from '../modules/asset-essentials-rt/asset-essentials-rt.service';
import { AssetEssentialsDto } from 'lib-typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class AssetEssentialsRtJobService {
  constructor(
    @InjectQueue('real-time-data-queue') private readonly realTimeDataQueue: Queue,
    private readonly assetEssentialsRtService: AssetEssentialsRtService,
    private readonly dataSource: DataSource, // Injecting DataSource here
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron() {
    const data = await this.fetchRealTimeData();
    await this.realTimeDataQueue.add('processRealTimeData', data);
    console.log(`Added job to process real-time data at ${new Date().toISOString()}`);
  }

  private async fetchRealTimeData(): Promise<AssetEssentialsDto[]> {
    // Example: Fetch real-time data using the injected DataSource
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      await queryRunner.connect();
      // Example: Running a custom query, you can replace this with actual data fetching logic
      const result = await queryRunner.query(`
        SELECT isin, price, volume FROM asset_essentials_rt_table 
        WHERE some_condition = true
      `);
      return result;
    } catch (error) {
      console.error('Error fetching real-time data:', error);
      throw new Error('Failed to fetch real-time data');
    } finally {
      await queryRunner.release();
    }
  }
}
