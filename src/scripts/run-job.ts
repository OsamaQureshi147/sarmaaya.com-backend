import { NestFactory } from '@nestjs/core';
import { JobModule } from 'src/jobs/job.module';
import { AssetEssentialsRtJobService } from '../jobs/asset-essentials-rt-job.service';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();

  const args = process.argv.slice(2);
  const jobName = args.find(arg => arg.startsWith('JOB='))?.split('=')[1];

  if (!jobName || jobName.trim() === '') {
    console.error('No job specified. Exiting...');
    process.exit();  
  }

  console.log(`Starting job: ${jobName}`);

  const app = await NestFactory.createApplicationContext(JobModule, {
    logger: ['error', 'warn', 'log'],
  });

  const jobService = app.get(AssetEssentialsRtJobService);

  if (['processRealTimeData' ,'processEodData', 'deleteRtData'].includes(jobName)) {
    switch (jobName) {
      case 'processRealTimeData':
        await jobService.handleCron();
        console.log('Job processRealTimeData executed successfully.');
        break;
      case 'processEodData':
        await jobService.runEodJob();
        console.log('Job processEodData executed successfully.');
        process.exit(1);
      case 'deleteRtData':
        await jobService.deleteRtData();
        console.log('Job deleteRtData executed successfully.');
        process.exit(1);
    }
  } else {
    console.error('Unknown job:', jobName);
    process.exit(1);
  }

  process.on('SIGTERM', async () => {
    console.log('SIGTERM signal received: closing jobs');
    await app.close();
    process.exit(0);
  });

}

bootstrap().catch(err => {
  console.error('Error during bootstrap:', err);
  process.exit(1);
});
