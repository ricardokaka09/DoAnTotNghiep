import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from '../../users/models/users.schema';
import { Products } from '../../products/models/products.schema';

@Entity()
export class Ratings {
  @PrimaryGeneratedColumn('uuid')
  ratingID: string;

  @ManyToOne(() => Users, (user) => user.userID, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userID' })
  @Column({ type: 'varchar', nullable: true })
  userID: string;

  @ManyToOne(() => Products, (product) => product.productID, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'productID' })
  @Column({ type: 'varchar', nullable: true })
  productID: string;

  @Column({ type: 'varchar', default: null })
  rating: string;

  @ManyToOne(() => Users, (user) => user.userID, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'createdBy' })
  @Column({ type: 'varchar', nullable: true })
  createdBy: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;
}
