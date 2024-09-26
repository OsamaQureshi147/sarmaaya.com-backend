import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { AssetFundamentalsEntity, AssetMetricsEntity, AssetFundamentalsDto, AssetDetailsEntity} from 'lib-typeorm-pro';
import { FindOptionsWhere } from 'typeorm';
import { In, Between } from 'typeorm';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AssetFundamentalsService {
  constructor(
    @InjectRepository(AssetFundamentalsEntity)
    private readonly assetFundamentalsRepository: Repository<AssetFundamentalsEntity>,
    @InjectRepository(AssetMetricsEntity)
    private readonly assetMetricsRepository: Repository<AssetMetricsEntity>,
    @InjectRepository(AssetDetailsEntity)
    private readonly assetDetailsRepository: Repository<AssetDetailsEntity>,
    private readonly configService: ConfigService
  ) {}

  //FUNDAMENTALS SERVICES

  async createFundamental(
    assetFundamentalsDto: AssetFundamentalsDto,
  ): Promise<AssetFundamentalsEntity> {
    const metric = await this.assetMetricsRepository.findOne({
      where: { metric: assetFundamentalsDto.metric },
    });

    if (!metric) {
      throw new NotFoundException('Metric not found');
    }

    const assetFundamental = this.assetFundamentalsRepository.create({
      ...assetFundamentalsDto,
      metric: metric,
    } as unknown as DeepPartial<AssetFundamentalsEntity>);

    return await this.assetFundamentalsRepository.save(assetFundamental);
  }

  async findAllFundamentals(
    query: Partial<AssetFundamentalsDto> & { startDate?: string, endDate?: string }, 
  ): Promise<AssetFundamentalsEntity[]> {
    const where: FindOptionsWhere<AssetFundamentalsEntity> = {};

    Object.keys(query).forEach((key) => {
      const value = query[key];
      if (value !== undefined && value !== null) {
        if (key === 'metric') {
          const metricsArray = Array.isArray(value)
            ? value
            : value.split(',').map((item) => item.trim());
          where[key] = In(metricsArray);
        } else if (key === 'isin') {
          const isinsArray = Array.isArray(value)
            ? value
            : value.split(',').map((item) => item.trim());
          where[key] = In(isinsArray);
        } else if (key === 'startDate' || key === 'endDate') {
        } else {
          where[key] = value;
        }
      }
    });

    if (query.startDate && query.endDate) {
      where.epsReportDate = Between(
        new Date(query.startDate),
        new Date(query.endDate),
      );
    } else if (query.startDate) {
      where.epsReportDate = Between(new Date(query.startDate), new Date()); // If only startDate provided
    }

    return this.assetFundamentalsRepository.find({
      where,
      relations: ['metric'],
    });
  }

  async findOneFundamental(
    id: number,
  ): Promise<AssetFundamentalsEntity | AssetMetricsEntity> {
    const fundamental = await this.assetFundamentalsRepository.findOne({
      where: { id: id },
      relations: ['metric'],
    });

    if (!fundamental) {
      throw new NotFoundException('Fundamental not found');
    }

    return {
      ...fundamental,
      metric: fundamental.metric?.metric,
    };
  }

  async updateFundamental(
    id: number,
    dto: AssetFundamentalsDto,
  ): Promise<AssetFundamentalsEntity> {
    const fundamental = await this.assetFundamentalsRepository.findOne({
      where: { id: id },
    });

    if (!fundamental) {
      throw new NotFoundException('Fundamental not found');
    }

    const metric = await this.assetMetricsRepository.findOne({
      where: { metric: dto.metric },
    });

    if (!metric) {
      throw new NotFoundException('Metric not found');
    }
    Object.assign(fundamental, dto);
    fundamental.metric = metric;

    await this.assetFundamentalsRepository.save(fundamental);

    return this.assetFundamentalsRepository.findOne({
      where: { id: id },
      relations: ['metric'],
    });
  }

  async removeFundamental(id: string): Promise<{ message: string }> {
    const deleteResult = await this.assetFundamentalsRepository.delete(id);

    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Fundamental with ID ${id} not found.`);
    }

    return {
      message: `Fundamental with ID ${id} has been deleted successfully.`,
    };
  }
  

async getCompanyDetails(isin: string) {
  const metrics = ['FF_CO_NAME', 'FF_PE', 'FF_PBK', 'FF_MKT_VAL_PUBLIC', 'FF_ENTRPR_VAL', 'FF_VOLUME_TRADE', 'FF_VOLUME_WK_AVG'];
  const metricDisplayNames = {
    'FF_CO_NAME': 'Company Name',
    'FF_PE': 'Price to Earning (P/E)',
    'FF_PBK': 'Price to Book (P/B)',
    'FF_MKT_VAL_PUBLIC': 'Market Cap',
    'FF_ENTRPR_VAL': 'Enterprise Value',
    'FF_VOLUME_TRADE': 'Volume',
    'FF_VOLUME_WK_AVG': 'Avg Vol'
  };

  return getMetricsData(isin, this.assetFundamentalsRepository, metrics, metricDisplayNames);
}

async getRatios(isin: string) {
  const metrics = [
    'FF_EPS_BASIC_GR',  
    'FF_PE',   
    'FF_DEBT_EQ', 
    'FF_ROIC', 
    'FF_ROCE',
    'FF_ROA',
    'FF_CURR_RATIO', 
    'FF_COM_EQ_ASSETS',
    'FF_PAY_OUT_RATIO',
    'FF_TOT_DEBT_TCAP_STD',
    'FF_BPS_GR',
    'FF_COM_EQ_GR',
    'FF_DPS_GR',
    'FF_NONPERF_LOAN_PCT',
    'FF_QUICK_RATIO',
    'FF_EBIT_OPER_MGN',
    'FF_GROSS_MGN',
    'FF_INT_MGN',
    'FF_NET_MGN',
    'FF_ROE',
    'FF_ROTC',
    'FF_ENTRPR_VAL',
    'FF_MKT_VAL_PUBLIC',
    'FF_DIV_YLD',
    'FF_PBK',
    'FF_EBIT_OPER_INT_COVG',
    'FF_CLAIMS_NET_PREM',
    'FF_OPER_INC_PREM_EARN',
    'FF_OPER_INC_PREM_WRITTEN',
    'FF_PREM_WRITTEN_COM_EQ'

  ];

  const metricDisplayNames = {
    'FF_EPS_BASIC_GR': 'EPS',
    'FF_PE': 'P/E',
    'FF_DEBT_EQ': 'Debt to Equity',
    'FF_ROIC': 'ROI',
    'FF_ROCE': 'ROE',
    'FF_ROA': 'ROA',
    'FF_CURR_RATIO': 'Current Ratio',
    'FF_COM_EQ_ASSETS': 'FF_COM_EQ_ASSETS',
    'FF_PAY_OUT_RATIO': 'FF_PAY_OUT_RATIO',
    'FF_TOT_DEBT_TCAP_STD': 'FF_TOT_DEBT_TCAP_STD',
    'FF_BPS_GR': 'FF_BPS_GR',
    'FF_COM_EQ_GR': 'FF_COM_EQ_GR',
    'FF_DPS_GR': 'FF_DPS_GR',
    'FF_NONPERF_LOAN_PCT': 'FF_NONPERF_LOAN_PCT',
    'FF_QUICK_RATIO': 'FF_QUICK_RATIO',
    'FF_EBIT_OPER_MGN': 'FF_EBIT_OPER_MGN',
    'FF_GROSS_MGN': 'FF_GROSS_MGN',
    'FF_INT_MGN': 'FF_INT_MGN',
    'FF_NET_MGN': 'FF_NET_MGN',
    'FF_ROE': 'FF_ROE',
    'FF_ROTC': 'FF_ROTC',
    'FF_ENTRPR_VAL': 'FF_ENTRPR_VAL',
    'FF_MKT_VAL_PUBLIC': 'FF_MKT_VAL_PUBLIC',
    'FF_DIV_YLD': 'FF_DIV_YLD',
    'FF_PBK': 'FF_PBK',
    'FF_EBIT_OPER_INT_COVG': 'FF_EBIT_OPER_INT_COVG',
    'FF_CLAIMS_NET_PREM': 'FF_CLAIMS_NET_PREM',
    'FF_OPER_INC_PREM_EARN': 'FF_OPER_INC_PREM_EARN',
    'FF_OPER_INC_PREM_WRITTEN': 'FF_OPER_INC_PREM_WRITTEN',
    'FF_PREM_WRITTEN_COM_EQ': 'FF_PREM_WRITTEN_COM_EQ'


  };

  const currentDate = new Date();
  const fiveYearsAgo = new Date();
  fiveYearsAgo.setFullYear(currentDate.getFullYear() - 5);

  const result = await this.assetFundamentalsRepository
    .createQueryBuilder('cd')
    .leftJoinAndSelect('cd.metric', 'metric')
    .select([
      'metric.metric', 
      'cd.value',
      'cd.epsReportDate',  
    ])
    .where('cd.isin = :isin', { isin })
    .andWhere('metric.metric IN (:...metrics)', { metrics })
    .andWhere('cd.epsReportDate BETWEEN :start AND :end', {
      start: fiveYearsAgo,
      end: currentDate,
    })
    .orderBy('cd.epsReportDate', 'DESC')
    .getMany();

  const formattedResponse = metrics.reduce((acc, metric) => {
    const displayName = metricDisplayNames[metric];
    acc[displayName] = [];  
    return acc;
  }, {} as Record<string, any>);


  for (const record of result) {
    const displayName = metricDisplayNames[record.metric.metric];
    formattedResponse[displayName].push({
      value: record.value,
      date: record.epsReportDate,  
    });
  }

  return formattedResponse;
}

  
async getCompanySnapshot(isin: string) {
  const metrics = ['FF_PAR_PS', 'FF_EPS_RPT_DATE', 'FF_PRICE_HIGH_52WK', 'FF_FREQ_CODE', 'FF_PRICE_LOW_52WK', 'FF_PBK', 'FF_DIV_YLD', 'FF_EBIT_OPER_INT_COVG', 'FF_DPS_LTM', 'FF_GROSS_MGN', 'FF_COM_SHS_OUT', 'FF_SHS_FLOAT'];
  const metricDisplayNames = {
    'FF_PAR_PS': 'Face Value',
    'FF_EPS_RPT_DATE': 'EPS',
    'FF_PRICE_HIGH_52WK': '52 Week High',
    'FF_FREQ_CODE': 'Earnings Report Frequency',
    'FF_PRICE_LOW_52WK': '52 Week Low',
    'FF_PBK': 'Book Value',
    'FF_DIV_YLD': 'Dividend Yield (%)',
    'FF_EBIT_OPER_INT_COVG': 'EBIT Interest Coverage',
    'FF_DPS_LTM': 'Last Dividend (RS)',
    'FF_GROSS_MGN': 'Gross Income Margin',
    'FF_COM_SHS_OUT': 'Outstanding Shares',
    'FF_SHS_FLOAT': 'Free Float Share'
  };

  return getMetricsData(isin, this.assetFundamentalsRepository, metrics, metricDisplayNames);
}

// async getCompanyAbout(isin: string) {
//   const metrics = ['FF_PHONE', 'FF_BUS_DESC_EXT', 'FF_ADDRESS2', 'FF_CITY', 'FF_URL'];
//   const employeeMetrics = ['FF_EMP_NUM'];

//   const metricDisplayNames = {
//     'FF_PHONE': 'Phone Number',
//     'FF_BUS_DESC_EXT': 'About Company',
//     'FF_ADDRESS2': 'Address',
//     'FF_CITY': 'City',
//     'FF_URL': 'Website',
//     'FF_EMP_NUM': 'No of Employees',
//   };

//   // Get the current date and calculate the date for 5 years ago
//   const currentDate = new Date();
//   const fiveYearsAgo = new Date();
//   fiveYearsAgo.setFullYear(currentDate.getFullYear() - 5);

//   const nonEmployeeData = await getMetricsData(isin, this.assetFundamentalsRepository, metrics, metricDisplayNames);

//   const employeeData = await this.assetFundamentalsRepository
//     .createQueryBuilder('cd')
//     .leftJoinAndSelect('cd.metric', 'metric')
//     .select(['metric.metric', 'cd.value', 'cd.epsReportDate'])
//     .where('cd.isin = :isin', { isin })
//     .andWhere('metric.metric IN (:...metrics)', { metrics: employeeMetrics })
//     .andWhere('cd.epsReportDate BETWEEN :start AND :end', { start: fiveYearsAgo, end: currentDate })
//     .orderBy('cd.epsReportDate', 'DESC')
//     .getMany();

//   // Initialize the response with non-employee data
//   const formattedResponse = {
//     ...nonEmployeeData,
//     'No of Employees': [],
//   };

//   for (const record of employeeData) {
//     const displayName = metricDisplayNames[record.metric.metric];
//     formattedResponse[displayName].push({
//       value: record.value || null,
//       date: record.epsReportDate
//     });
//   }

//   return formattedResponse;
// }

async getCompanyAbout(isin: string) {
  const metrics = ['FF_PHONE', 'FF_BUS_DESC_EXT', 'FF_URL', 'FF_ADDRESS2', 'FF_CITY', 'FF_COUNTRY'];
  const employeeMetrics = ['FF_EMP_NUM'];

  const metricDisplayNames = {
    'FF_PHONE': 'Phone Number',
    'FF_BUS_DESC_EXT': 'About Company',
    'FF_URL': 'Website',
    'FF_EMP_NUM': 'No of Employees',
    'FF_ADDRESS2': 'Address',
    'FF_CITY': 'City',
    'FF_COUNTRY': 'Country'
  };

  const currentDate = new Date();
  const fiveYearsAgo = new Date();
  fiveYearsAgo.setFullYear(currentDate.getFullYear() - 5);

  const nonEmployeeData = await getMetricsData(isin, this.assetFundamentalsRepository, metrics, metricDisplayNames);

  const employeeData = await this.assetFundamentalsRepository
    .createQueryBuilder('cd')
    .leftJoinAndSelect('cd.metric', 'metric')
    .select(['metric.metric', 'cd.value', 'cd.epsReportDate'])
    .where('cd.isin = :isin', { isin })
    .andWhere('metric.metric IN (:...metrics)', { metrics: employeeMetrics })
    .andWhere('cd.epsReportDate BETWEEN :start AND :end', { start: fiveYearsAgo, end: currentDate })
    .orderBy('cd.epsReportDate', 'DESC')
    .getMany();

  const formattedResponse = {
    ...nonEmployeeData,
    'No of Employees': [],
  };

  for (const record of employeeData) {
    const displayName = metricDisplayNames[record.metric.metric];
    formattedResponse[displayName].push({
      value: record.value || null,
      date: record.epsReportDate,
    });
  }

  const profile = await this.fetchProfile(isin);

  if (profile && profile.data && profile.data.length > 0) {
    const { ceo, address, sector, industry } = profile.data[0];
    formattedResponse['Industry'] = industry;
    formattedResponse['Sector'] = sector;
    formattedResponse['CEO'] = ceo;

  }

  return formattedResponse;
}

async fetchProfile(isin: string): Promise<any> {
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

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(`Error fetching profile for ISIN ${isin}:`, error.response.data);
    } else {
      console.error(`Error fetching profile for ISIN ${isin}:`, error.message);
    }
    return null;
  }
}

async getDividendData (isin:string) {
  const metrics = ['FF_DPS_LTM', 'FF_STK_SPLIT_RATIO','FF_PAY_OUT_RATIO','FF_EPS_BASIC_GR'];
  const metricDisplayNames = {
    'FF_DPS_LTM' : 'Dividend Yield',
    'FF_STK_SPLIT_RATIO': 'Dividend Amount',
    'FF_PAY_OUT_RATIO': 'Payout Ratio',
    'FF_EPS_BASIC_GR': 'EPS'
  };

  return getMetricsData(isin, this.assetFundamentalsRepository, metrics, metricDisplayNames);

}

}

export async function getMetricsData(
  isin: string, 
  assetFundamentalsRepository: Repository<AssetFundamentalsEntity>,
  metrics: string[],
  metricDisplayNames: Record<string, string>,
  dateRange?: { start: Date, end: Date }
): Promise<Record<string, any>> {

  const queryBuilder = assetFundamentalsRepository
    .createQueryBuilder('cd')
    .leftJoinAndSelect('cd.metric', 'metric')
    .select([
      'metric.metric', 
      'metric.name',
      'cd.value',
      'cd.eps_report_date',
    ])
    .where('cd.isin = :isin', { isin })
    .andWhere('metric.metric IN (:...metrics)', { metrics });

  if (dateRange) {
    queryBuilder.andWhere('cd.eps_report_date BETWEEN :start AND :end', {
      start: dateRange.start,
      end: dateRange.end,
    });
  } else {
    queryBuilder.andWhere(
      'cd.eps_report_date = (SELECT MAX(sub_cd.eps_report_date) FROM asset_fundamentals sub_cd WHERE sub_cd.isin = cd.isin AND sub_cd.metric = cd.metric)'
    );
  }

  const result = await queryBuilder.getMany();

  // const formattedResponse = metrics.reduce((acc, metric) => {
  //   const displayName = metricDisplayNames[metric];
  //   acc[displayName] = Array.isArray(acc[displayName]) ? [] : ''; 
  //   return acc;
  // }, {} as Record<string, any>);

  // for (const record of result) {
  //   const displayName = metricDisplayNames[record.metric.metric];
  //   if (Array.isArray(formattedResponse[displayName])) {
  //     formattedResponse[displayName].push({
  //       value: record.value,
  //       date: record.epsReportDate,
  //     });
  //   } else {
  //     formattedResponse[displayName] = record.value;
  //   }
  // }

  return result.reduce((acc, curr) => {
    acc[curr.metric.metric] = curr.value;
    return acc;
}, {} as Record<string, string>);
}
