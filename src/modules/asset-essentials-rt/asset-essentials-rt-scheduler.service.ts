import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { AssetEssentialsRealTimeEntity } from 'lib-typeorm';

@Injectable()
export class AssetEssentialsRtSchedulerService {
  private readonly logger = new Logger(AssetEssentialsRtSchedulerService.name);

  constructor(
    @InjectQueue('data-queue') private readonly dataQueue: Queue,
  ) {
    this.logger.log('AssetEssentialsRtSchedulerService initialized');
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async scheduleRealTimeData() {
    this.logger.log('Cron job triggered');
    
    const simulatedData = new AssetEssentialsRealTimeEntity();
    simulatedData.isin = 'SA0007879113';
    simulatedData.symbol = 'ABC';
    simulatedData.price= Math.floor(Math.random() * 1000), 
    simulatedData.high= Math.floor(Math.random() * 1000),  
    simulatedData.low= Math.floor(Math.random() * 1000),   
    simulatedData.annualChangePercent= Math.floor(Math.random() * 100), 
    simulatedData.yearToDateChangePercent= Math.floor(Math.random() * 100), 
    simulatedData.volume= Math.floor(Math.random() * 10000), 
    simulatedData.changePercent= Math.floor(Math.random() * 10), 
    simulatedData.marketCap= Math.floor(Math.random() * 1000000), 

    await this.dataQueue.add('processData', simulatedData);
    this.logger.log('Real-time data scheduled and added to the queue.');
  }
}
