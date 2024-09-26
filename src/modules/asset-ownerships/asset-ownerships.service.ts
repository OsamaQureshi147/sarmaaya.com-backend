import { Injectable, OnModuleInit, NotFoundException } from '@nestjs/common';
import { ApiClient, FundHoldingsApi, SecurityHoldersApi } from '@factset/sdk-factsetownership';
import { AssetOwnershipEntity, AssetOwnershipDto, AssetDetailsEntity } from 'lib-typeorm-pro'; // Import AssetDetailsEntity
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AssetOwnershipsService implements OnModuleInit {
  private fundHoldingsApi: FundHoldingsApi;
  private securityHoldersApi: SecurityHoldersApi;

  constructor(
    @InjectRepository(AssetOwnershipEntity)
    private readonly assetOwnershipRepository: Repository<AssetOwnershipEntity>,
    
    @InjectRepository(AssetDetailsEntity) // Inject AssetDetailsEntity
    private readonly assetDetailsRepository: Repository<AssetDetailsEntity>,
  ) {}

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

  async findSecurityHolders(query: any): Promise<any[]> {
    const { securityId, date, holderType, topn, currency } = query;
    const ids = Array.isArray(securityId) ? securityId : [securityId];

    const response = await this.securityHoldersApi.getSecurityHolders(ids, {
      date,
      holderType,
      topn,
      currency,
    });

    
    return response.data || [];
}

  async removeSecurityHolder(securityId: string, date: string): Promise<{ message: string }> {
    throw new NotFoundException(`Security holder with ID ${securityId} cannot be deleted.`);
  }

  async updateAssetOwnerships() {
    const isins = [
      'SA15H0HKKU17', 'SA1520CJGGH7', 'SA0007879824', 'SA000A0DM9P2', 'SA15SH122J13',
      'SA14E0523P52', 'SA0007879337', 'SA000A0JK4U9', 'SA1210540914', 'SA15BG54KN10',
      'SA15GH80KKH0', 'SA135G51UI10', 'SA14GG523Q50', 'SA14TG92TU17', 'SA0007879089',
      'SA14T12HF015', 'SA12B050KK11', 'SA15LGC4L8H3', 'SA15GG9KKQH9', 'SA13IG50SE12',
      'SA15L0K4L7H2', 'SA0007879402', 'SA15OH84LB11', 'SA14HG523SL1', 'SA0007879154',
      'SA0007879451', 'SA0007879816', 'SA31RG522S19', 'SA15DGHKKPH8', 'SA15CIBJGH12',
      'SA0007879394', 'SA0007879113', 'SA15DGU21117', 'SA0007879121', 'SA0007879501',
      'SA15K0H4L4H6', 'SA13LG50KBH9', 'SA000A0KFKK0', 'SA15HG50IFH7', 'SA000A0MJ2H8',
      'SA132GSGS910', 'SA0007879188', 'SA15P1D4LC16', 'SA124060V8H1', 'SA159GK22IH4',
      'SA0007879105', 'SA121053VV10', 'SA122GF0IT17', 'SA15IGO4L1H9', 'SA13DG50KB18',
      'SA11T053VG15', 'SA14TGL1UM17', 'SA15AG54KM12', 'SA13HG51UJ13', 'SA130G50IOH8',
      'SA000A0LE310', 'SA15SGBKLL10', 'SA0007879386', 'SA154HG210H6', 'SA15IH0KL210',
      'SA000A0LB2R6', 'SA128G53E019', 'SA0007879238', 'SA14TGQHV9H8', 'SA15PGQ4LDH7',
      'SA15D1I1VJH7', 'SA15J0H4L312', 'SA0007879667', 'SA14BG523NL8', 'SA13Q050IP16',
      'SA15S0S4LJH9', 'SA0007879618', 'SA0007879469', 'SA0007879246', 'SA000A0D9HK3',
      'SA0007879162', 'SA13I051EUH6', 'SA1430IHULH1', 'SA0007879329', 'SA15GGOKKUH7',
      'SA15CGS10H12', 'SA15JHD4L416', 'SA0007879352', 'SA15J1S23H17', 'SA11RGL0IU14',
      'SA15M1HH2NH5', 'SA15A054KLH2', 'SA14I0DKKJ17', 'SA15PGK4LCH5', 'SA15SGOKLLH9',
      'SA158GIKKKH8', 'SA15J0K4L2H7', 'SA15LISJGI11', 'SA13R051UVH9', 'SA000A0JK5M3',
      'SA15T1L22JH8', 'SA000A0SR838', 'SA15DGH1VOH4', 'SA12A0540J14', 'SA15SHO4LMH6',
      'SA000A0DPSH3', 'SA0007879055', 'SA13Q051UK14', 'SA000A0EAXM3', 'SA14BG523N54',
      'SA0007879527', 'SA0007879626', 'SA0007879600', 'SA15T0MKLP11', 'SA12CG541219',
      'SA1591410GH0', 'SA15GG53GHH3', 'SA000A0HNGZ6', 'SA15L134L718', 'SA0007879550',
      'SA14I0523TL9', 'SA132051ET14', 'SA15IH34L116', 'SA15QH34LGH2', 'SA0007879204',
      'SA12U0RHUHH8', 'SA15M4M4LAH3', 'SA15M10KL9H7', 'SA145G523L57', 'SA12CG541C16',
      'SA0007879196', 'SA15QGU1UNH6', 'SA0007879410', 'SA1330R2TQ16', 'SA14TG012N13',
      'SA0007879576', 'SA15DHKGHBH4', 'SA153H820MH5', 'SA13J051UJH4', 'SA0007879253',
      'SA15QGU13LH9', 'SA153G80IF11', 'SA1510P1UMH1', 'SA000A0MLUD8', 'SA15T0J4LOH8',
      'SA0007870062', 'SA15JH2H3L19', 'SA15M2B4LA13', 'SA0007879063', 'SA000A0KDVM8',
      'SA0007879659', 'SA15QH00SKH0', 'SA0007870088', 'SA13AG53T618', 'SA15K0SKL513',
      'SA14CG523O51', 'SA1210540419', 'SA0007879675', 'SA12IG523B16', 'SA0007879915',
      'SA15R214LH17', 'SA15Q08KLF13', 'SA000A0MLUE6', 'SA0007879683', 'SA15PGS4LD16',
      'SA15H14I11H6', 'SA0007870047', 'SA1230K1UGH7', 'SA15LI2KL814', 'SA11T053VL18',
      'SA55SG6H5716', 'SA15L0N10HH3', 'SA0007879568', 'SA120GAH5617', 'SA1610O13M15',
      'SA0007879642', 'SA122050HV19', 'SA15JHPITV18', 'SA14QG523GH3', 'SA121053DR18',
      'SA15DG52TUH8', 'SA158GAKKL15', 'SA11TGN15119', 'SA000A0LF1T0', 'SA0007879790',
      'SA14GG523S58', 'SA000A0MJ2J4', 'SA14E0523PL6', 'SA12C051UH11', 'SA12GGDGIUH9',
      'SA11TH0I3111', 'SA15IG94KVH6', 'SA1230A2TOH3', 'SA13L050IE10', 'SA15PGIKLE15',
      'SA0007879543', 'SA0007879220', 'SA15HG50KL10', 'SA0007879782', 'SA15L1I156H7',
      'SA0007879360', 'SA14A0523M59', 'SA148G523LL8', 'SA11RGEI3218', 'SA15GGQ1UN19',
      'SA15HG521213', 'SA13U0923G19', 'SA12U0541RH2', 'SA123GA0ITH7', 'SA0007879170',
      'SA0007879808', 'SA12S051ESH9', 'SA0007879345', 'SA15JH3KL3H8', 'SA139051UIH0',
      'SA15BG54KMH4', 'SA14GG523R59', 'SA15ED94KR18', 'SA000A0MSQ64', 'SA14TGAI1FH7',
      'SA11T053VQ13', 'SA0007879147', 'SA12I0OGIV12', 'SA000A0MQCJ2', 'SA15L16KL6H8',
      'SA15PGTKLEH9', 'SA15R0E4LI18', 'SA15GG54KTH8', 'SA000A0MR864', 'SA136051EU12',
      'SA12CG541714', 'SA12JG51G9H8', 'SA15TGH1GA14', 'SA0007879048', 'SA12HG541M13',
      'SA15BG54KNH2', 'SA0007870104', 'SA14C0PHEVH7', 'SA14K0Q0SJ16', 'SA000A0HNF36',
      'SA15H134KV18', 'SA12RGH0KAH5', 'SA15GGP4KRH1', 'SA0007879261', 'SA0007870070',
      'SA141H01UKH9', 'SA15QG71VP17', 'SA000A0KEWM4', 'SA15PH34LG16', 'SA12A0540T12',
      'SA0007879493', 'SA000A0LEF64', 'SA0007879535', 'SA15GHD4KS19', 'SA15KG54HA19',
      'SA000A0B89Q3', 'SA134G51ETH6', 'SA0007879519', 'SA12GGPITP13', 'SA000A0MWH44',
      'SA000A0MR823', 'SA0007879378', 'AEE01135A222', 'SA15KGDKL611', 'SA000A0BLA62',
      'SA0007879592', 'SA000A0ETHT1', 'SA15GH84KSH5', 'SA0007870054', 'SA1563RGSK16',
      'SA15C2IKKO13', 'SA15SGSI3HH9', 'SA15BH1H3KH5', 'SA000A0MSX40', 'SA0007879832',
      'SA000A0MLUG1', 'SA15LGLI0N19', 'SA0007870096', 'SA15OHDKLBH0', 'SA15RH24LJ13',
      'SA15E1N4KQ13', 'SA11U0S23612', 'SA15T0H4LNH2', 'SA14PGMJGG18', 'SA15H194KT19',
      'SA14I0523T54', 'SA000A0MR898', 'SA15JGK4L5H6', 'SA14AG523ML1', 'SA14LG523U13',
      'SA14L09I31H9', 'SA15PHA4LFH9', 'SA12A0540O17', 'SA15IH3KL016', 'SA15IH44L0H7',
      'SA12HG541R18', 'SA1420I0KC11', 'SA14QH2GSJH8', 'SA15TGE4LR12', 'SA0007879139',
      'SA000A0MLUH9'
    ];

    //const isins = ['SA15GG53GHH3']

    for (const isin of isins) {
      console.log(`Processing ISIN: ${isin}`);
  
      
      const securityHolders = await this.findSecurityHolders({
        securityId: isin,
        holderType: 'M', 
        topn: 5,         
        currency: 'SAR', 
      });
  
      console.log(`SecurityHolders data for ISIN ${isin}:`, securityHolders);
  
      if (securityHolders && securityHolders.length > 0) {
        // Find the latest date (considering only the date part)
        const latestDate = securityHolders.reduce((latest, current) => {
          return new Date(latest.date).getTime() > new Date(current.date).getTime() ? latest : current;
        }).date;
  
        console.log(`Latest date for ISIN ${isin}: ${latestDate}`);
  
        const latestEntries = securityHolders.filter(holder => {
          const holderDate = new Date(holder.date).setHours(0, 0, 0, 0);
          const latestDateOnly = new Date(latestDate).setHours(0, 0, 0, 0);
          return holderDate === latestDateOnly;
        });
  
        console.log(`Filtered latest entries for ISIN ${isin}:`, latestEntries);
  
        if (latestEntries.length > 0) {
          for (const holder of latestEntries) {
            console.log(`Inserting data for ISIN: ${isin}, Holder ID: ${holder.holderId}, Date: ${holder.date}`);
  
            const assetOwnershipDto: AssetOwnershipDto = {
              isin,
              holderName: holder.holderName,
              holderType: holder.holderType,
              investorType: holder.investorType,
              adjHolding: holder.adjHolding,
              adjMarketValue: holder.adjMarketValue,
              weightClose: holder.weightClose,
              percentageOutstanding: holder.percentOutstanding,
              date: new Date(holder.date),
            };
  
            await this.create(assetOwnershipDto);
          }
        } else {
          console.warn(`Unexpected: No valid entries found for the latest date ${latestDate} for ISIN ${isin}`);
        }
      } else {
        console.error(`No valid data found for ISIN: ${isin}. This shouldn't happen if valid data exists.`);
        console.warn(`Inserting null values for ISIN: ${isin}`);
  
        const assetOwnershipDto: AssetOwnershipDto = {
          isin,
          holderName: null,
          holderType: null,
          investorType: null,
          adjHolding: null,
          adjMarketValue: null,
          weightClose: null,
          percentageOutstanding: null,
          date: null,
        };
  
        await this.create(assetOwnershipDto);
      }
    }
  
    console.log('Asset ownerships update process completed');
  }
}