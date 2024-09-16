import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AssetDetailsEntity } from 'lib-typeorm';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CompanyReportsService {
  constructor(
    @InjectRepository(AssetDetailsEntity)
    private readonly assetDetailsRepository: Repository<AssetDetailsEntity>,
    private readonly configService: ConfigService
  ) {}

  // Fetch data from external APIs based on ISINs from asset_details table
  async fetchCompanyReports(): Promise<void> {
    try {
      // Fetch ISINs from asset_details table
      const assetDetails = await this.assetDetailsRepository.find({
        select: ['isin'],
      });
      const isins = assetDetails.map((detail) => detail.isin);

      if (isins.length === 0) {
        throw new NotFoundException('No ISINs found in the asset_details table');
      }

      // Loop through each ISIN and fetch the required reports
      for (const isin of isins) {
        await this.fetchFinancialStatement(isin);
        await this.fetchProfile(isin);
        await this.fetchFundamentals(isin);
      }
    } catch (err) {
        if (err.response) {
            console.error(`Error fetching financial statement for ISIN :`, err.response.data);
          } else {
            console.error(`Error fetching financial statement for ISIN :`, err.message);
          }
    }
  }

  // Fetch financial statement for a specific ISIN
  private async fetchFinancialStatement(isin: string): Promise<void> {
    const apiUrl = `https://api.factset.com/content/factset-fundamentals/v2/company-reports/financial-statement`;
  
    try {
      const response = await axios.get(apiUrl, {
        params: {
          statementType: 'BS',   
          id: isin,              
          periodicity: 'ANN',
          updateType: 'RF',
          limit: '1'  
        },
        auth: {
          username: this.configService.get('FACTSET_USERNAME'),
          password: this.configService.get('FACTSET_PASSWORD'),
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const financialData = response.data.data[0];
      const { requestId, reportDate, fiscalYear, items } = financialData;
  
      // Structure the parsed response
      const parsedData = {
        requestId,
        fsymId: financialData.fsymId,
        reportDate,
        fiscalYear,
        item: items.map((item) => ({
          name: item.name,
          displayLevel: item.displayLevel,
          displayOrder: item.displayOrder,
          updateType: 'RF', 
          value: item.value,   
        })),
      };
  
      console.log('Parsed Financial Data:', JSON.stringify(parsedData, null, 2));
    } catch (error) {
      if (error.response) {
        console.error(`Error fetching financial statement for ISIN ${isin}:`, error.response.data); // Log detailed response
      } else {
        console.error(`Error fetching financial statement for ISIN ${isin}:`, error.message);
      }
    }
  }
  
//   // Fetch company profile for a specific ISIN
  private async fetchProfile(isin: string): Promise<void> {
    const apiUrl = `https://api.factset.com/content/factset-fundamentals/v2/company-reports/profile`;
  
    try {
      const response = await axios.get(apiUrl, {
        params: {
          ids: isin, 
        },
        auth: {
          username: this.configService.get('FACTSET_USERNAME'),
          password: this.configService.get('FACTSET_PASSWORD'),
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      console.log('Profile Response:', JSON.stringify(response.data, null, 2));
    } catch (error) {
      if (error.response) {
        console.error(`Error fetching profile for ISIN ${isin}:`, error.response.data);
      } else {
        console.error(`Error fetching profile for ISIN ${isin}:`, error.message);
      }
    }
  }
  

  private async fetchFundamentals(isin: string): Promise<void> {
    const apiUrl = `https://api.factset.com/content/factset-fundamentals/v2/company-reports/fundamentals`;
  
    try {
      const response = await axios.get(apiUrl, {
        params: {
          ids: isin, 
        },
        auth: {
          username: this.configService.get('FACTSET_USERNAME'),
          password: this.configService.get('FACTSET_PASSWORD'),
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // Log the full response
      console.log('Fundamentals Response:', JSON.stringify(response.data, null, 2));
    } catch (error) {
      if (error.response) {
        console.error(`Error fetching fundamentals for ISIN ${isin}:`, error.response.data);
      } else {
        console.error(`Error fetching fundamentals for ISIN ${isin}:`, error.message);
      }
    }
  }
  
}
