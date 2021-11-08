import { Categories } from '../../categories/models/categories.schema';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Stores } from '../../stores/models/stores.schema';

@Entity()
export class SubCategories {
  @PrimaryGeneratedColumn('uuid')
  subCategoryID: string;

  @ManyToOne(() => Categories, (category) => category.categoryID, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'categoryID' })
  @Column({ type: 'varchar', nullable: false })
  categoryID: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @ManyToOne(() => Stores, (stores) => stores.storeID, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'storeID' })
  @Column({ type: 'varchar', nullable: true })
  storeID: string;

  @Column({ type: 'int', nullable: true, default: 0 })
  totalProduct: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;
}
