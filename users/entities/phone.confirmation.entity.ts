import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class PhoneConfirmation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @Column()
  code: number;

  @Column()
  phone: string;

  @Column({ type: 'uuid', nullable: true })
  userId: string;

  @OneToOne(() => UserEntity, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: UserEntity;
}
