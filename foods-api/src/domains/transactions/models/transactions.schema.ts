import { Orders } from '../../orders/models/orders.schema';
import { Stores } from '../../stores/models/stores.schema';
import { Users } from '../../users/models/users.schema';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Transactions {
  @PrimaryGeneratedColumn('uuid')
  transactionID: string;

  @ManyToOne(() => Stores, (stores) => stores.storeID, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'storeID' })
  @Column({ type: 'varchar', nullable: true })
  storeID: string;

  @ManyToOne(() => Users, (users) => users.userID, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'userID' })
  @Column({ type: 'varchar', nullable: true })
  userID: string;

  @ManyToOne(() => Orders, (orders) => orders.orderID, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'orderID' })
  @Column({ type: 'varchar', nullable: true })
  orderID: string;

  @Column({ type: 'int', nullable: false, default: 0 })
  amount: number;

  @Column({ type: 'int', nullable: false, default: 0 })
  originAmount: number;

  @Column({ type: 'float', nullable: true, default: 0 })
  percentFee: number;

  @Column({ type: 'int', nullable: true, default: 0 })
  fixedFee: number;

  @Column({ type: 'int', nullable: true, default: 0 })
  manualFee: number;

  @Column({ type: 'int', nullable: true, default: 0 })
  fee: number;

  @Column({ type: 'varchar' })
  status: string;

  @Column({ type: 'varchar', nullable: true })
  deniedReason: string;

  @Column({ type: 'varchar' })
  type: string;

  @Column({ type: 'text', nullable: true })
  note: string;

  @ManyToOne(() => Users, (users) => users.userID, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'createdBy' })
  @Column({ type: 'varchar', nullable: true })
  createdBy: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;
}
