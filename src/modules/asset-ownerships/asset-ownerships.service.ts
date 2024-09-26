import { Injectable, OnModuleInit, NotFoundException } from '@nestjs/common';
import { ApiClient, FundHoldingsApi, SecurityHoldersApi } from '@factset/sdk-factsetownership';
import { AssetOwnershipEntity, AssetOwnershipDto } from 'lib-typeorm-pro';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository} from 'typeorm';
@Injectable()
export class AssetOwnershipsService implements OnModuleInit {
  private fundHoldingsApi: FundHoldingsApi;
  private securityHoldersApi: SecurityHoldersApi;

  constructor(
    @InjectRepository(AssetOwnershipEntity)
    private readonly assetOwnershipRepository: Repository<AssetOwnershipEntity>,) {}

  async onModuleInit() {
    this.initializeApi();
  }

  private initializeApi() {
    const username = process.env.FACTSET_USERNAME;
    const password = process.env.FACTSET_PASSWORD;

    if (!username || !password) {
      throw new Error('Username password not found');
    }

    const apiClient = ApiClient.instance;
    const basicAuth = apiClient.authentications['FactSetApiKey'];

    basicAuth.username = username;
    basicAuth.password = password;

    this.fundHoldingsApi = new FundHoldingsApi(apiClient);
    this.securityHoldersApi = new SecurityHoldersApi(apiClient);
  }
  
  async create(assetOwnershipDto: AssetOwnershipDto): Promise<AssetOwnershipEntity> {
    const assetDetails = this.assetOwnershipRepository.create(assetOwnershipDto);
    return this.assetOwnershipRepository.save(assetDetails);
  }

async findSecurityHolders(query: any): Promise<AssetOwnershipEntity[]> {

    const { securityId, date, holderType, topn, currency } = query;
  
    const ids = Array.isArray(securityId) ? securityId : [securityId];
  
    const data = await this.securityHoldersApi.getSecurityHolders(ids, {
      date,
      holderType,
      topn,
      currency,
    });
  
    return data; 
  }
  
  
  async removeSecurityHolder(securityId: string, date: string): Promise<{ message: string }> {
    throw new NotFoundException(`Security holder with ID ${securityId} cannot be deleted.`);
  }

  //   async findOneFundHolding(fundId: string, date: string): Promise<AssetOwnershipEntity> {
//     const result = await this.findFundHoldings({ fundId, date });
//     if (!result || result.length === 0) {
//       throw new NotFoundException(`Fund holding with ID ${fundId} not found.`);
//     }
//     return result[0]; // Assuming the API returns an array
//   }

}
