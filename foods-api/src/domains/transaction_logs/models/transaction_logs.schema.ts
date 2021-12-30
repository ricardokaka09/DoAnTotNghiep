import { Stores } from '../../stores/models/stores.schema';
import { Transactions } from '../../transactions/models/transactions.schema';
import { Users } from '../../users/models/users.schema';
import { Orders } from '../../orders/models/orders.schema';
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
export class TransactionLogs {
  @PrimaryGeneratedColumn('uuid')
  transactionLogID: string;

  @ManyToOne(() => Transactions, (transactions) => transactions.transactionID, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'transactionID' })
  @Column({ type: 'varchar', nullable: false })
  transactionID: string;

  @ManyToOne(() => Stores, (stores) => stores.storeID, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'storeID' })
  @Column({ type: 'varchar', nullable: true })
  storeID: string;

  @ManyToOne(() => Orders, (orders) => orders.orderID, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'orderID' })
  @Column({ type: 'varchar', nullable: true })
  orderID: string;

  @ManyToOne(() => Users, (users) => users.userID, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'userID' })
  @Column({ type: 'varchar', nullable: true })
  userID: string;

  @Column({ type: 'int', nullable: true, default: 0 })
  amount: number;

  @Column({ type: 'int', nullable: true, default: 0 })
  originAmount: number;

  @Column({ type: 'int', nullable: true, default: 0 })
  fee: number;

  @Column({ type: 'varchar' })
  status: string; // is status of transaction transmit into

  @Column({ type: 'varchar', nullable: true })
  deniedReason: string;

  // @Column({ type: 'varchar', nullable: false})
  // bankID: string

  @Column({ type: 'varchar' })
  event: string;

  @Column({ type: 'varchar', nullable: true })
  type: string; // is type of transaction transmit into

  @Column({ type: 'text', nullable: true })
  note: string;

  // logs info when companyID, storeID, userID or orderID be removed
  @Column({ type: 'text', nullable: true })
  data: string;

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
