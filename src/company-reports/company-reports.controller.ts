import { Controller, Get, Query, InternalServerErrorException } from '@nestjs/common';
import { CompanyReportsService } from './company-reports.service';

@Controller('company-reports')
export class CompanyReportsController {
  constructor(private readonly companyReportsService: CompanyReportsService) {}

  
  // Endpoint to fetch financial statement for a specific ISIN
  @Get('financial-statement')
  async fetchFinancialStatement(@Query('isin') isin: string) {
    try {
      await this.companyReportsService.fetchFinancialStatement(isin);
      return { message: `Financial statement for ISIN ${isin} fetched successfully.` };
    } catch (error) {
      throw new InternalServerErrorException(error.message || `Failed to fetch financial statement for ISIN ${isin}.`);
    }
  }

  // Endpoint to fetch company profile for a specific ISIN
  @Get('profile')
  async fetchProfile(@Query('isin') isin: string) {
    try {
      await this.companyReportsService.fetchProfile(isin);
      return { message: `Company profile for ISIN ${isin} fetched successfully.` };
    } catch (error) {
      throw new InternalServerErrorException(error.message || `Failed to fetch profile for ISIN ${isin}.`);
    }
  }

  // Endpoint to fetch fundamentals for a specific ISIN
  @Get('fundamentals')
  async fetchFundamentals(@Query('isin') isin: string) {
    try {
      await this.companyReportsService.fetchFundamentals(isin);
      return { message: `Fundamentals for ISIN ${isin} fetched successfully.` };
    } catch (error) {
      throw new InternalServerErrorException(error.message || `Failed to fetch fundamentals for ISIN ${isin}.`);
    }
  }
}
