import { CustomBaseEntity } from 'src/common/entity/custom-base.entity';
import { AssetType } from 'src/common/interfaces';
import { Column, Entity } from 'typeorm';

// import { Brand } from '../interfaces/brand.interface';

@Entity({
  name: 'asset_details',
  comment: 'Stores company details, will also be used as an ISIN mapper',
})
export class AssetDetailsEntity extends CustomBaseEntity {
  @Column({ unique: true })
  isin: string;

  @Column({ name: 'asset_type', type: 'enum', enum: AssetType })
  assetType: AssetType;

  @Column()
  sector: string;

  @Column()
  industry: string;

  @Column()
  website: string;

  // @TODO add this column in future
  // @Column()
  // brands: Brand[];

  @Column({ name: 'company_size', type: 'int' })
  companySize: number;

  @Column()
  about: string;

  @Column({ name: 'is_shariah', type: 'boolean', default: false })
  isShariah: boolean;
}
