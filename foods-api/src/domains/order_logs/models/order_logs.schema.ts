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
import { Users } from '../../users/models/users.schema';
import { Orders } from '../../orders/models/orders.schema';

@Entity()
export class OrderLogs {
  @PrimaryGeneratedColumn('uuid')
  orderLogID: string;

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

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @Column({ type: 'int', nullable: true, default: 0 })
  totalAmount: number;

  @Column({ type: 'int', nullable: true, default: 0 })
  originalAmount: number;

  @Column({ type: 'int', nullable: true, default: 0 })
  discount: number;

  @Column({ type: 'int', nullable: true, default: 0 })
  fee: number;

  @Column({ type: 'varchar', nullable: true })
  type: string;

  @Column({ type: 'varchar', nullable: true })
  status: string;

  @Column({ type: 'json', nullable: true })
  receivedAt: string;

  @ManyToOne(() => Users, (users) => users.userID, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'createdBy' })
  @Column({ type: 'varchar', nullable: true })
  createdBy: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;

  @Column({ type: 'varchar', nullable: false })
  event: string;

  @Column({ type: 'varchar', nullable: true })
  title: string;
}
