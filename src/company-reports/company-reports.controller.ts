import { Controller, Get } from '@nestjs/common';
import { CompanyReportsService } from './company-reports.service';

@Controller('company-reports')
export class CompanyReportsController {
  constructor(private readonly companyReportsService: CompanyReportsService) {}

  @Get('fetch')
  async fetchCompanyReports() {
    try {
      await this.companyReportsService.fetchCompanyReports();
      return { message: 'Company reports fetched successfully.' };
    } catch (error) {
      return { error: error.message || 'Failed to fetch company reports.' };
    }
  }
}
