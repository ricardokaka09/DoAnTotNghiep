import { Stores } from '../../stores/models/stores.schema';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Categories } from '../../categories/models/categories.schema';
import { SubCategories } from '../../sub_categories/models/sub_categories.schema';

@Entity()
export class Products {
  @PrimaryGeneratedColumn('uuid')
  productID: string;

  @ManyToOne(() => Stores, (stores) => stores.storeID, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'storeID' })
  @Column({ type: 'varchar', nullable: true })
  storeID: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @Column({ type: 'int', nullable: true, default: 0 })
  price: number;

  @Column({ type: 'int', nullable: true, default: 0 })
  minPrice: number;

  @Column({ type: 'varchar', nullable: true })
  photos: string[];

  @Column({ type: 'varchar', nullable: true })
  thumbNail: string;

  @Column({ type: 'varchar', nullable: true })
  type: string;

  @Column({ type: 'varchar', nullable: true })
  tag: string;

  @Column({ type: 'int', nullable: true, default: 0 })
  quantity: number;

  @ManyToOne(() => Categories, (categories) => categories.categoryID, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'categoryID' })
  @Column({ type: 'varchar', nullable: true })
  categoryID: string;

  @ManyToOne(
    () => SubCategories,
    (subCategories) => subCategories.subCategoryID,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'subCategoryID' })
  @Column({ type: 'varchar', nullable: true })
  subCategoryID: string;

  @Column({ type: 'varchar', nullable: true })
  origin: string;

  @Column({ type: 'json', nullable: true })
  properties: string;

  @Column({ type: 'varchar', nullable: true })
  trademark: string;

  @Column({ type: 'varchar', nullable: true })
  createdBy: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;
}
