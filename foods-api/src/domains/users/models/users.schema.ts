import { ExtendedUsers } from '../../extended_users/models/extended_users.schema';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  userID: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  fullName: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  gender: string;

  @Column({ type: 'date', nullable: true })
  dateOfBirth: Date;

  @Column({ type: 'varchar', nullable: true, default: null })
  avatar: string;

  @Column({ type: 'varchar', nullable: true, default: UserStatus.INACTIVE })
  status: string;

  @OneToOne(() => ExtendedUsers, (extendedUser) => extendedUser.userID, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'extendedUser' })
  @Column({ type: 'varchar', nullable: true, select: false })
  extendedUser: string;

  @Column({
    name: 'createdAt',
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    name: 'updatedAt',
    type: 'timestamp',
    nullable: true,
    default: null,
  })
  updatedAt: Date;
}
