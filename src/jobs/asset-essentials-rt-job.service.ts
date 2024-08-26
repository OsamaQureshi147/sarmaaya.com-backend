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
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron() {
    const data = await this.fetchRealTimeData();
    await this.realTimeDataQueue.add('processRealTimeData', data);
    console.log(`Added job to process real-time data at ${new Date().toISOString()}`);
  }

  private async fetchRealTimeData(): Promise<AssetEssentialsDto[]> {
    // Fetch your real-time data from an external API or source
    // Here, you can use AssetEssentialsRtService to save the fetched data
    return [
      { isin: 'ISIN1', price: 100.5, volume: 200 },
      { isin: 'ISIN2', price: 101.0, volume: 250 },
      // Add more data as per your structure
    ];
  }
}
