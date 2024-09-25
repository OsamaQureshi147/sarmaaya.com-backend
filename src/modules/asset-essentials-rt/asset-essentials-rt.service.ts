import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, Between} from 'typeorm';
import { AssetEssentialsDto, AssetEssentialsRealTimeEntity,  AssetEssentialsWithoutRealTimeEntity} from 'lib-typeorm-pro';
import { AssetEssentialsQueryEnum } from './enums/query.enum';



@Injectable()
export class AssetEssentialsRtService {
  constructor(
    @InjectRepository(AssetEssentialsRealTimeEntity)
    private readonly assetEssentialsRealTimeRepository: Repository<AssetEssentialsRealTimeEntity>,
    @InjectRepository(AssetEssentialsWithoutRealTimeEntity)
    private readonly assetEssentialsWithoutRealTimeRepository: Repository<AssetEssentialsWithoutRealTimeEntity>,
  ) {}

  async createRealTime(
    dto: AssetEssentialsDto,
  ): Promise<AssetEssentialsRealTimeEntity> {
    const entity = this.assetEssentialsRealTimeRepository.create(dto);
    return this.assetEssentialsRealTimeRepository.save(entity);
  }
  
  
  // async findAllRealTime(): Promise<AssetEssentialsRealTimeEntity[]> {
  //   return this.assetEssentialsRealTimeRepository.find();
  // }

  async findAllRealTime(query: AssetEssentialsRealTimeEntity): Promise<AssetEssentialsRealTimeEntity[]> {
    const where: FindOptionsWhere<AssetEssentialsRealTimeEntity> = {};
  
    Object.keys(query).forEach(key => {
      const value = query[key];
      if (value !== undefined && value !== null) {
        where[key] = value;
      }
    });
  
    return await this.assetEssentialsRealTimeRepository.find({ where });
  }

  async findOneRealTime(id: number): Promise<AssetEssentialsRealTimeEntity> {
    const oneRealTime = await this.assetEssentialsRealTimeRepository.findOne({
      where: { id: id },
    });
    if (!oneRealTime) {
      throw new NotFoundException(`AssetEssential with id ${id} not found.`);
    }

    return oneRealTime;
  }

  async updateRealTime(
    id: number,
    dto: AssetEssentialsDto,
  ): Promise<AssetEssentialsRealTimeEntity> {
    const realTimeEntity = await this.assetEssentialsRealTimeRepository.findOne(
      { where: { id: id } },
    );

    if (!realTimeEntity) {
      throw new NotFoundException(`Asset with id ${id} not found.`);
    }

    Object.assign(realTimeEntity, dto);

    await this.assetEssentialsRealTimeRepository.save(realTimeEntity);
    return realTimeEntity;
  }

  async removeRealTime(id: number): Promise<{ message: string }> {
    const deleteResult =
      await this.assetEssentialsRealTimeRepository.delete(id);

    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Asset with id ${id} not found.`);
    }

    return { message: `Asset with id ${id} has been deleted successfully.` };
  }

  async findLatestDataofIsin(
    isin: string,
  ): Promise<AssetEssentialsRealTimeEntity> {
    try {
      const latestData = await this.assetEssentialsRealTimeRepository.findOne({
        where: { isin },
        order: { created_at: 'DESC' },
      });

      if (!latestData) {
        throw new NotFoundException(`No data found for ISIN: ${isin}`);
      }
      return latestData;
    } catch (error) {
      console.error('Service: Error during query execution:', error.message);
      throw error;
    }
  }

  async findIsinDatabyDays(
    isin: string,
    days: number,
  ): Promise<
    AssetEssentialsRealTimeEntity[] | AssetEssentialsWithoutRealTimeEntity[]
  > {
    const today = new Date();
    const endDate = today;
    const startDate = new Date();
    startDate.setDate(today.getDate() - days);

    const oneMonthAgo = new Date();
    oneMonthAgo.setDate(today.getDate() - 30);

    const rtData = await this.assetEssentialsRealTimeRepository.find({
      where: {
        isin,
        created_at: Between(oneMonthAgo, endDate),
      },
    });

    const wrtData =
      days > 30
        ? await this.assetEssentialsWithoutRealTimeRepository.find({
            where: {
              isin,
              created_at: Between(startDate, oneMonthAgo),
            },
          })
        : [];

    const combinedData = [...rtData, ...wrtData];
    return combinedData;
  }

  async findLatestDataOfIsins(field = 'volume', order = 'desc', type= 'stock'): Promise<AssetEssentialsRealTimeEntity[]> {
    // let order = AssetEssentialsQueryEnum.order;
    // let field = AssetEssentialsQueryEnum.field;
    // const query = `
    //   SELECT DISTINCT ON (isin) *
    //   FROM asset_essentials_rt
    //   ORDER BY isin ${field} ${order};
    // `;

    const sortedQuery = `
    WITH asset AS (
        SELECT isin, MAX(created_at) AS max_created_at
        FROM asset_essentials_rt
        GROUP BY isin
    )
    SELECT asset.*, asset_essentials_rt.*
    FROM asset
    LEFT JOIN asset_essentials_rt 
    ON asset.isin = asset_essentials_rt.isin 
    AND asset.max_created_at = asset_essentials_rt.created_at order by "${field}" ${order};
    `

    const latestIsinsData =
      await this.assetEssentialsRealTimeRepository.query(sortedQuery);

    return latestIsinsData;
  }

  ///////////////////////////////////////////////////////////////////////////

  async getData(
    isin: string,
    days: number,
  ): Promise<
    AssetEssentialsRealTimeEntity[] | AssetEssentialsWithoutRealTimeEntity[]
  > {
    const today = new Date();
    const endDate = today;
    const startDate = new Date();
    startDate.setDate(today.getDate() - days);

    const oneMonthAgo = new Date();
    oneMonthAgo.setDate(today.getDate() - 30);

    const rtData = await this.assetEssentialsRealTimeRepository.find({
      where: {
        isin,
        created_at: Between(oneMonthAgo, endDate),
      },
    });

    const wrtData =
      days > 30
        ? await this.assetEssentialsWithoutRealTimeRepository.find({
            where: {
              isin,
              created_at: Between(startDate, oneMonthAgo),
            },
          })
        : [];

    const combinedData = [...rtData, ...wrtData];
    return combinedData;
  }
}
