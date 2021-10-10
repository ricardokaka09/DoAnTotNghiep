import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ExtendedUsers {
  @PrimaryColumn()
  userID: string;

  @Column({ type: 'varchar', unique: true, nullable: true })
  email: string;

  @Column({ unique: true, nullable: true })
  phoneNumber: string;

  @Column({ type: 'text', default: null, select: false })
  password: string;

  @Column({ type: 'double', default: null })
  changePasswordAt: number;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;
}
