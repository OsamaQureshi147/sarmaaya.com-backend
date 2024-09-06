import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { AssetFundamentalsEntity, AssetMetricsEntity, AssetFundamentalsDto} from 'lib-typeorm';
import { FindOptionsWhere } from 'typeorm';
import { In, Between } from 'typeorm';

@Injectable()
export class AssetFundamentalsService {
  constructor(
    @InjectRepository(AssetFundamentalsEntity)
    private readonly assetFundamentalsRepository: Repository<AssetFundamentalsEntity>,
    @InjectRepository(AssetMetricsEntity)
    private readonly assetMetricsRepository: Repository<AssetMetricsEntity>,
  ) {}

  //FUNDAMENTALS SERVICES

  async createFundamental(assetFundamentalsDto: AssetFundamentalsDto): Promise<AssetFundamentalsEntity>{
    const metric = await this.assetMetricsRepository.findOne({ where: { metric: assetFundamentalsDto.metric } });

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
    query: Partial<AssetFundamentalsDto> & { startDate?: string, endDate?: string }, // Add startDate and endDate as query params
  ): Promise<AssetFundamentalsEntity[]> {
    const where: FindOptionsWhere<AssetFundamentalsEntity> = {};
  
    Object.keys(query).forEach((key) => {
      const value = query[key];
      if (value !== undefined && value !== null) {
        if (key === 'metric') {
          const metricsArray = Array.isArray(value) ? value : value.split(',').map(item => item.trim());
          where[key] = In(metricsArray);
        } else if (key === 'isin') {
          const isinsArray = Array.isArray(value) ? value : value.split(',').map(item => item.trim());
          where[key] = In(isinsArray);
        } else if (key === 'startDate' || key === 'endDate') {
        } else {
          where[key] = value;
        }
      }
    });
  
    if (query.startDate && query.endDate) {
      where.epsReportDate = Between(new Date(query.startDate), new Date(query.endDate));
    } else if (query.startDate) {
      where.epsReportDate = Between(new Date(query.startDate), new Date()); // If only startDate provided
    }
  
    return this.assetFundamentalsRepository.find({
      where,
      relations: ['metric'],
    });
  }

  async findOneFundamental(id: number): Promise<AssetFundamentalsEntity | AssetMetricsEntity> {
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

  async updateFundamental(id: number, dto: AssetFundamentalsDto): Promise<AssetFundamentalsEntity> {
    const fundamental = await this.assetFundamentalsRepository.findOne({ where: { id: id } });
  
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
  
    return { message: `Fundamental with ID ${id} has been deleted successfully.` };
  }

  async getCompanyDetails(isin: string) {
    const metrics = [
      'FF_PE', 
      'FF_PBK', 
      'FF_MKT_VAL_PUBLIC', 
      'FF_ENTRPR_VAL', 
      'FF_VOLUME_TRADE', 
      'FF_VOLUME_WK_AVG', 
    ]
  
    
    const metricDisplayNames = {
      'FF_PE': 'Price to Earning (P/E)',
      'FF_PBK': 'Price to Book (P/B)',
      'FF_MKT_VAL_PUBLIC': 'Market Cap',
      'FF_ENTRPR_VAL': 'Enterprise Value',
      'FF_VOLUME_TRADE': 'Volume',
      'FF_VOLUME_WK_AVG': 'Avg Vol'
    };
  
    const result = await this.assetFundamentalsRepository
      .createQueryBuilder('cd')
      .leftJoinAndSelect('cd.metric', 'metric')
      .select([
        'metric.metric', 
        'cd.value',
        'cd.eps_report_date',
      ])
      .where('cd.isin = :isin', { isin })
      .andWhere('metric.metric IN (:...metrics)', { metrics })
      .andWhere('cd.eps_report_date = (SELECT MAX(sub_cd.eps_report_date) FROM asset_fundamentals sub_cd WHERE sub_cd.isin = cd.isin AND sub_cd.metric = cd.metric)')
      .getMany();
  
    const formattedResponse = metrics.reduce((acc, metric) => {
      const displayName = metricDisplayNames[metric];
      acc[displayName] = ''; 
      return acc;
    }, {});
  
    for (const record of result) {
      
      const displayName = metricDisplayNames[record.metric.metric];
      formattedResponse[displayName] = record.value;
    }
  
    return formattedResponse;
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
    ];

    const metricDisplayNames = {
      'FF_EPS_BASIC_GR': 'EPS',
      'FF_PE': 'P/E',
      'FF_DEBT_EQ': 'Debt to Equity',
      'FF_ROIC': 'ROI',
      'FF_ROCE':'ROE',
      'FF_ROA':'ROA',
      'FF_CURR_RATIO':'Current Ratio'
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
        'cd.eps_report_date',
      ])
      .where('cd.isin = :isin', { isin })
      .andWhere('metric.metric IN (:...metrics)', { metrics })
      .andWhere('cd.eps_report_date BETWEEN :start AND :end', {
        start: fiveYearsAgo,
        end: currentDate,
      })
      .orderBy('cd.eps_report_date', 'DESC')
      .getMany();

    
    const formattedResponse = metrics.reduce((acc, metric) => {
      const displayName = metricDisplayNames[metric];
      acc[displayName] = []; 
      return acc;
    }, {});

    
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
    const metrics = [
      'FF_PAR_PS',        
      'FF_EPS_RPT_DATE',             
      'FF_PRICE_HIGH_52WK',       
      'FF_FREQ_CODE',
      'FF_PRICE_LOW_52WK',
      'FF_PBK',
      'FF_DIV_YLD',
      'FF_EBIT_OPER_INT_COVG',
      'FF_DPS_LTM',
      'FF_GROSS_MGN',
      'FF_COM_SHS_OUT_CURR_DATE',
      'FF_SHS_FLOAT',
    ];

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
      'FF_COM_SHS_OUT_CURR_DATE': 'Outstanding Shares',
      'FF_SHS_FLOAT': 'Free Float Share'
    };

    
    const result = await this.assetFundamentalsRepository
      .createQueryBuilder('cd')
      .leftJoinAndSelect('cd.metric', 'metric')
      .select([
        'metric.metric', 
        'cd.value',
        'cd.eps_report_date',
      ])
      .where('cd.isin = :isin', { isin })
      .andWhere('metric.metric IN (:...metrics)', { metrics })
      .andWhere('cd.eps_report_date = (SELECT MAX(sub_cd.eps_report_date) FROM asset_fundamentals sub_cd WHERE sub_cd.isin = cd.isin AND sub_cd.metric = cd.metric)')
      .getMany();

    
    const formattedResponse = metrics.reduce((acc, metric) => {
      const displayName = metricDisplayNames[metric];
      acc[displayName] = ''; 
      return acc;
    }, {});

    
    for (const record of result) {
      const displayName = metricDisplayNames[record.metric.metric];
      formattedResponse[displayName] = record.value; 
    }

    return formattedResponse;
  }


  async getcompanyAbout(isin: string) {
    const metrics = [
      'FF_PHONE',        
      'FF_BUS_DESC_EXT',
    ];

    const metricDisplayNames = {
      'FF_PHONE': 'Phone Number',
      'FF_BUS_DESC_EXT': 'About Company',
      
    };

    
    const result = await this.assetFundamentalsRepository
      .createQueryBuilder('cd')
      .leftJoinAndSelect('cd.metric', 'metric')
      .select([
        'metric.metric', 
        'cd.value',
        'cd.eps_report_date',
      ])
      .where('cd.isin = :isin', { isin })
      .andWhere('metric.metric IN (:...metrics)', { metrics })
      .andWhere('cd.eps_report_date = (SELECT MAX(sub_cd.eps_report_date) FROM asset_fundamentals sub_cd WHERE sub_cd.isin = cd.isin AND sub_cd.metric = cd.metric)')
      .getMany();

    
    const formattedResponse = metrics.reduce((acc, metric) => {
      const displayName = metricDisplayNames[metric];
      acc[displayName] = ''; 
      return acc;
    }, {});

    
    for (const record of result) {
      const displayName = metricDisplayNames[record.metric.metric];
      formattedResponse[displayName] = record.value; 
    }

    return formattedResponse;
  }



}