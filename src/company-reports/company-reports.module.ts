import { Module } from '@nestjs/common';
import { CompanyReportsService } from './company-reports.service';
import { AssetDetailsEntity } from 'lib-typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CompanyReportsController } from './company-reports.controller';


@Module({
  imports: [
    TypeOrmModule.forFeature([AssetDetailsEntity]),  
    ConfigModule,
  ],
  providers: [CompanyReportsService],
  controllers: [CompanyReportsController]
})
export class CompanyReportsModule {}
