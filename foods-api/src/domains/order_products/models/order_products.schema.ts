import { Orders } from '../../orders/models/orders.schema';
import { Products } from '../../products/models/products.schema';
import { Stores } from '../../stores/models/stores.schema';
import { Users } from '../../users/models/users.schema';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class OrderProducts {
  @PrimaryGeneratedColumn('uuid')
  orderProductID: string;

  @ManyToOne(() => Orders, (orders) => orders.orderID, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'orderID' })
  @Column({ type: 'varchar', nullable: true })
  orderID: string;

  @ManyToOne(() => Stores, (stores) => stores.storeID, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'storeID' })
  @Column({ type: 'varchar', nullable: true })
  storeID: string;

  @ManyToOne(() => Users, (users) => users.userID, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userID' })
  @Column({ type: 'varchar', nullable: true })
  userID: string;

  @ManyToOne(() => Products, (products) => products.productID, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'productID' })
  @Column({ type: 'varchar', nullable: true })
  productID: string;

  @Column({ type: 'int', nullable: true, default: 0 })
  quantity: number;

  @ManyToOne(() => Users, (users) => users.userID, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'createdBy' })
  @Column({ type: 'varchar', nullable: true })
  createdBy: string;

  @UpdateDateColumn({ type: 'datetime' })
  createdAt: string;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: string;
}
