import { Controller, Get, Query, Delete, NotFoundException,Post,Body } from '@nestjs/common';
import { AssetOwnershipsService } from './asset-ownerships.service';
import { AssetOwnershipEntity, AssetOwnershipDto } from 'lib-typeorm-pro';

@Controller('asset-ownerships')
export class AssetOwnershipsController {
  constructor(private readonly assetOwnershipsService: AssetOwnershipsService) {}


@Post()
async create(@Body() assetOwnershipDto: AssetOwnershipDto): Promise<AssetOwnershipEntity> {
  return this.assetOwnershipsService.create(assetOwnershipDto);
}

  @Get('security-holder')
  async getSecurityHolder(
    @Query('securityId') securityId: string,
    @Query('date') date: string,
    @Query('holderType') holderType: string,
    @Query('topn') topn: string,
    @Query('currency') currency: string
  ): Promise<any> {
    try {
      const query = {
        securityId,
        date,
        holderType,
        topn,
        currency,
      };
      return await this.assetOwnershipsService.findSecurityHolders(query);
    } catch (error) {
      throw new NotFoundException(`Security holder with ID ${securityId} not found for date ${date}.`);
    }
  }


//   @Delete('fund-holding')
//   async deleteFundHolding(
//     @Query('fundId') fundId: string,
//     @Query('date') date: string
//   ): Promise<{ message: string }> {
//     try {
//       return await this.assetOwnershipsService.removeFundHolding(fundId, date);
//     } catch (error) {
//       throw new NotFoundException(`Fund holding with ID ${fundId} cannot be deleted.`);
//     }
//   }

  @Delete('security-holder')
  async deleteSecurityHolder(
    @Query('securityId') securityId: string,
    @Query('date') date: string
  ): Promise<{ message: string }> {
    try {
      return await this.assetOwnershipsService.removeSecurityHolder(securityId, date);
    } catch (error) {
      throw new NotFoundException(`Security holder with ID ${securityId} cannot be deleted.`);
    }
  }
}
