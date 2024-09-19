import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
    FactSetFundamentalsApi,
    FundamentalsRequest,
    CompanyReportsApi,
    MetricsApi
} from '@factset/sdk-factsetfundamentals';
import { EntityManager, Repository } from 'typeorm';
import factsetInit from 'src/config/factsetConfig';
import { InjectRepository } from '@nestjs/typeorm';
import { AssetFundamentalsEntity } from './entity/asset-fundamentals.entity';
import { parse } from 'path';


@Injectable()
export class AssetFundamentalsService {
    constructor(
        @InjectRepository(AssetFundamentalsEntity) private readonly assetFundamentalsRepository: Repository<AssetFundamentalsEntity>,
        private readonly entityManager: EntityManager,
    ) { 
        factsetInit()
    }

    replaceKeyInObject(obj, oldKey, newKey){
        if (!Object.prototype.hasOwnProperty.call(obj, oldKey)) {
          return obj;
        }
        const { [oldKey]: oldKeyValue, ...rest } = obj;
        return { [newKey]: oldKeyValue, ...rest };
    };

    delay(ms: number) {
        return new Promise(res => setTimeout(res, ms));
    }

    parseFundamentalsData(data: any[]) {
        return data.map((item) => {
            const {
                fiscalPeriod,
                requestId,
                fsymId,
                metric,
                periodicity,
                fiscalYear,
                fiscalPeriodLength,
                fiscalEndDate,
                reportDate,
                epsReportDate,
                updateType,
                currency,
                value
            } = item;

            return {
                fiscalPeriod,
                requestId,
                fsymId,
                metric,
                periodicity,
                fiscalYear,
                fiscalPeriodLength,
                fiscalEndDate,
                reportDate,
                epsReportDate,
                updateType,
                currency,
                value: value?.value || value, // Handle both nested and non-nested cases
            };
        });
    } 

    async createBulk(isins: String[], metrics: String[], periodicity: string = 'ANN', batchRequest: string = 'N') {
        try {
                const apiInstance = new FactSetFundamentalsApi();
                let fundamentalsRequest = new FundamentalsRequest();
                fundamentalsRequest.data = {
                    ids: isins,
                    periodicity: periodicity,
                    updateType: "RF",
                    fiscalPeriod: {
                        start: "2019-01-01",
                        end: "2024-03-31"
                    },
                    metrics,
                    batch: batchRequest
                }

                return apiInstance.getFdsFundamentalsForList(fundamentalsRequest).then(
                    async (data: { statusCode: any; getResponse200: () => { (): any; new(): any; data: any; }; getResponse202: () => any; }) => {
                        // data is a responsewrapper: GetFdsFundamentalsForListResponseWrapper
                        switch (data.statusCode) {

                            case 200:
                                // FundamentalsResponse
                                let excelData = data.getResponse200().data;
                                const parsedData = this.parseFundamentalsData(excelData);
                                parsedData.forEach(obj => {
                                    delete obj['fsymId'];
                                });
                                const res = parsedData.map(obj => this.replaceKeyInObject(obj, 'requestId', 'isin'));
                                
                                // await this.entityManager.transaction(async (entityManager) => {
                                    // console.log(res);
                                    // await this.entityManager.save(AssetFundamentalsEntity, res);
                                // });
                                return res;
                            case 202:
                                // BatchStatusResponse
                                return data.getResponse202();
                        }
                    },
                    (error: { body: {} | []; }) => {
                        console.error('error', error);
                        throw new InternalServerErrorException(error?.body)
                    },
                );
        } catch (err) {
            console.log("Error Message", err?.body)
            throw new InternalServerErrorException(err?.body)
        }

    }

    async getFundamentalsProfile(){
        const apiInstance = new CompanyReportsApi();
        let isins = await this.getIsins()
        const ids = isins.map(x => x.isin); // [String] | The requested list of security identifiers. Accepted ID types include Market Tickers, SEDOL, ISINs, CUSIPs, or FactSet Permanent Ids. <p>***ids limit** =  50 per request*</p> 

        //Call api endpoint
        apiInstance.getFdsProfiles(ids).then(
        data => {
            console.log('API called successfully. Returned data:');
            console.log(data);
        },
        error => {
            console.error(error);
        },
        );

        return 'ok'
    }

    async getMetrics(datatype: string = 'floatArray') {
        let metrics = await this.entityManager.query(`select metric from asset_metrics am where data_type = '${datatype}' and metric not IN ('FF_VOLUME_WK_AVG', 'FF_VOLUME_TRADE')`);
        return metrics
    }

    async getIsins() {
        let isins = await this.entityManager.query(`select isin from asset_details ad order by isin limit 50`);
        return isins
    }

    async getAllMetrics() {
        const apiInstance = new MetricsApi();
        const opts = {

        };
    
        return apiInstance.getFdsFundamentalsMetrics(opts).then(
          (data) => {
            return data.data;
          },
          (error: any) => {
            console.error(error);
          },
        );
    }

    async test(){
        let metrics = await this.getMetrics()
        let isins = await this.getIsins()
        console.log("ISINS: ",isins.map(x => x.isin))
        console.log("Metrics: ",metrics.map(x => x.metric))
        
        // metrics.delete('FF_VOLUME_TRADE')
        return this.createBulk(isins.map(x => x.isin), metrics.map(x => x.metric))
        // return 'data'
    }
}
