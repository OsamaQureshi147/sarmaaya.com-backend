import { CustomBaseEntity } from 'src/common/entity/custom-base.entity';
import { Column, Entity } from 'typeorm';

// import { Brand } from '../interfaces/brand.interface';

@Entity({
  name: 'asset_details',
  comment: 'Stores company details, will also be used as an ISIN mapper',
})
export class AssetDetailsEntity extends CustomBaseEntity {
  @Column({ unique: true })
  isin: string;

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
