import { AssetType, ExchangeId } from 'src/common/interfaces';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

// import { Brand } from '../interfaces/brand.interface';

@Entity({
  name: 'asset_details',
  comment: 'Stores company details, will also be used as an ISIN mapper',
})
export class AssetDetailsEntity {
  @PrimaryColumn({ unique: true })
  isin: string;

  @Column({ name: 'company_name', nullable: true })
  companyName: string;

  @Column({
    name: 'exchange_id',
    type: 'enum',
    enum: ExchangeId,
    default: ExchangeId.SAU,
  })
  exchangeId: ExchangeId;

  @Column({ name: 'asset_type', type: 'enum', enum: AssetType })
  assetType: AssetType;

  @Column({ nullable: true })
  sector: string;

  @Column({ nullable: true })
  industry: string;

  @Column({ nullable: true })
  website: string;

  // @TODO add this column in future
  // @Column()
  // brands: Brand[];

  @Column({ name: 'company_size', type: 'int', nullable: true })
  companySize: number;

  @Column({ nullable: true })
  about: string;

  @Column({ name: 'is_shariah', type: 'boolean', default: false })
  isShariah: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
