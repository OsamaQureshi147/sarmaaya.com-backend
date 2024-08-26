// 

import { NestFactory } from '@nestjs/core';
import { JobModule } from 'src/jobs/job.module';
import { AssetEssentialsRtJobService } from '../jobs/asset-essentials-rt-job.service';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();

  const args = process.argv.slice(2);
  const jobName = args.find(arg => arg.startsWith('JOB='))?.split('=')[1] || 'processRealTimeData';

  console.log(`Starting job: ${jobName}`);

  const app = await NestFactory.createApplicationContext(JobModule, {
    logger: ['error', 'warn', 'log'],
  });

  const jobService = app.get(AssetEssentialsRtJobService);

  switch (jobName) {
    case 'processRealTimeData':
      async function runRealTimeDataJob() {
        try {
          await jobService.handleCron();
          console.log('Job processRealTimeData executed successfully.');
        } catch (error) {
          console.error('Error executing real-time data job:', error);
        }
        setTimeout(runRealTimeDataJob, 60000); // Run every 1 minute
      }

      async function runEodJob() {
        try {
          await jobService.handleEodCron();
          console.log('Job processEodData executed successfully.');
        } catch (error) {
          console.error('Error executing EOD job:', error);
        }
        setTimeout(runEodJob, 300000); // Run every 5 minutes
      }

      runRealTimeDataJob();
      runEodJob();
      break;

    // Example of adding more jobs in the future
    case 'someOtherJob':
      async function runSomeOtherJob() {
        try {
          // Implement some other job functionality here
          console.log('Job someOtherJob executed successfully.');
        } catch (error) {
          console.error('Error executing some other job:', error);
        }
        setTimeout(runSomeOtherJob, 60000); // Example interval
      }

      runSomeOtherJob();
      break;

    default:
      console.error(`Unknown job: ${jobName}`);
      process.exit(1);
  }

  // Graceful shutdown
  process.on('SIGTERM', async () => {
    console.log('SIGTERM signal received: closing jobs');
    await app.close();
    process.exit(0);
  });

  process.on('SIGINT', async () => {
    console.log('SIGINT signal received: closing jobs');
    await app.close();
    process.exit(0);
  });
}

bootstrap().catch(err => {
  console.error('Error during bootstrap:', err);
  process.exit(1);
});
