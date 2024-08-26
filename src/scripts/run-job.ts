// import { NestFactory } from '@nestjs/core';
// import { JobModule } from 'src/jobs/job.module';
// import { AssetEssentialsRtJobService } from '../jobs/asset-essentials-rt-job.service';

// async function bootstrap() {
//   const args = process.argv.slice(2);
//   const jobName = args.find(arg => arg.startsWith('JOB='))?.split('=')[1];

//   if (!jobName) {
//     console.error('No JOB specified.');
//     process.exit(1);
//   }

//   console.log(`Starting job: ${jobName}`);

//   const app = await NestFactory.createApplicationContext(JobModule, {
//     logger: ['error', 'warn'],
//   });

//   try {
//     const jobService = app.get(AssetEssentialsRtJobService);

//     switch (jobName) {
//       case 'processRealTimeData':
//         await jobService.handleCron();
//         console.log('Job processRealTimeData executed successfully.');
//         break;

//       default:
//         console.error(`Unknown job: ${jobName}`);
//         process.exit(1);
//     }
//   } catch (error) {
//     console.error(`Error executing job: ${error.message}`);
//     process.exit(1);
//   } finally {
//     await app.close();
//   }
// }

// bootstrap().catch(err => {
//   console.error('Error during bootstrap:', err);
//   process.exit(1);
// });
