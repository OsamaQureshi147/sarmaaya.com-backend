import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { AssetEssentialsRtService } from '../modules/asset-essentials-rt/asset-essentials-rt.service';
import { DataSource } from 'typeorm';

@Processor('real-time-data-queue')
export class AssetEssentialsRtProcessorService {
  constructor(
    private readonly assetEssentialsRtService: AssetEssentialsRtService,
    private readonly dataSource: DataSource 
  ) {}

  @Process('processRealTimeData')
  async handleRealTimeData(job: Job): Promise<void> {
    const data = job.data;

    try {

      if (!this.dataSource.isInitialized) {
        console.log('Database connection is not initialized. Trying to connect...');
        await this.dataSource.initialize();
        console.log('Database connection established.');
      }


      for (const dataPoint of data) {
        console.log(`Processing data for ISIN ${dataPoint.isin}:`, dataPoint);
        await this.assetEssentialsRtService.createRealTime(dataPoint);
      }

      console.log(`Successfully processed ${data.length} data points at ${new Date().toISOString()}`);
    } catch (error) {
      console.error(`Error processing batch data at ${new Date().toISOString()}:`, error);
    }
  }
}
