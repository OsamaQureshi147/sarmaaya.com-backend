import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getOrmConfig } from './config/ormConfig';
import { AssetDetailsModule } from './modules/asset-details/asset-details.module';
import { AssetEssentialsRtModule } from './modules/asset-essentials-rt/asset-essentials-rt.module';
import { AssetEssentialsWrtModule } from './modules/asset-essentials-wrt/asset-essentials-wrt.module';
import { CompanyReportsModule } from './company-reports/company-reports.module';
import { CompanyReportsService } from './company-reports/company-reports.service';
import { CompanyReportsController } from './company-reports/company-reports.controller';
import { AssetOwnershipsModule } from './modules/asset-ownerships/asset-ownerships.module';
import { AssetSegmentsModule } from './modules/asset-segments/asset-segments.module';
import { AssetFundamentalsModule } from './modules/asset-fundamentals/asset-fundamentals.module';
import { AssetMetricsModule } from './modules/asset-metrics/asset-metrics.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(getOrmConfig()),
    AssetDetailsModule,
    AssetEssentialsRtModule,
    AssetEssentialsWrtModule,
    AssetSegmentsModule,
    AssetFundamentalsModule,
    AssetMetricsModule,
    CompanyReportsModule,
    AssetOwnershipsModule,
  ],
  // providers: [CompanyReportsService],
  // controllers: [CompanyReportsController],
})
export class AppModule {}
