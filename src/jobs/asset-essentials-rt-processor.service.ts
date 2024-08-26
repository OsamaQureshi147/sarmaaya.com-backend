import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { AssetEssentialsRtService } from '../modules/asset-essentials-rt/asset-essentials-rt.service';

@Processor('real-time-data-queue')
export class AssetEssentialsRtProcessorService {
  constructor(private readonly assetEssentialsRtService: AssetEssentialsRtService) {}

  @Process('processRealTimeData')
  async handleRealTimeData(job: Job): Promise<void> {
    const data = job.data;
    try {
      // Process the data using service methods
      await this.assetEssentialsRtService.createRealTime(data);
      console.log(`Processed data for ISIN ${data.isin} at ${new Date().toISOString()}`);
    } catch (error) {
      console.error(`Error processing data for ISIN ${data.isin}:`, error);
    }
  }
}
