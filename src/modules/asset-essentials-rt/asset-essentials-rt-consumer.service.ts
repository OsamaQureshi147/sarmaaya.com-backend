import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AssetEssentialsRealTimeEntity } from 'lib-typeorm';

@Injectable()
@Processor('data-queue')
export class AssetEssentialsRtConsumerService {
  private readonly logger = new Logger(AssetEssentialsRtConsumerService.name);

  constructor(
    @InjectRepository(AssetEssentialsRealTimeEntity)
    private readonly assetEssentialsRealTimeRepo: Repository<AssetEssentialsRealTimeEntity>,
  ) {}

  @Process('processData')
  async handleProcessData(job: Job<AssetEssentialsRealTimeEntity>) {
    this.logger.log('Job received by worker');

    const data = job.data;
    this.logger.log(`Processing data: ${JSON.stringify(data)}`);

    try {
      
      await this.assetEssentialsRealTimeRepo.save(data);
      this.logger.log('Data processed and saved to the database successfully.');
    } catch (error) {
      
      this.logger.error('Error occurred while saving data to the database', error.stack);
    }
  }
}
