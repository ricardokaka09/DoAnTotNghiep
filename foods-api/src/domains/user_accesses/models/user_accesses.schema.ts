import { Stores } from '../../../domains/stores/models/stores.schema';
import { Users } from '../../../domains/users/models/users.schema';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class UserAccesses {
  @PrimaryGeneratedColumn('uuid')
  userAccessID: string;

  @ManyToOne(() => Stores, (store) => store.storeID, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'storeID' })
  @Column({ type: 'varchar', nullable: true })
  storeID: string;

  @ManyToOne(() => Users, (user) => user.userID, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userID' })
  @Column({ type: 'varchar', nullable: true })
  userID: string;

  @Column({ type: 'int', nullable: false })
  roleName: number;

  @Column({ type: 'varchar', nullable: false })
  status: string;

  @ManyToOne(() => Users, (user) => user.userID, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'createdBy' })
  @Column({ type: 'varchar', nullable: true })
  createdBy: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @CreateDateColumn({ type: 'datetime' })
  updatedAt: Date;
}
