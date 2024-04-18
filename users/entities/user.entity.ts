import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Upload } from '../../upload/entities/upload.entity';
import { JwtRefreshToken } from '../../auth/entities/jwt.refresh.entity';
import { Exclude } from 'class-transformer';
import { UserRoles } from '../enums/userRoles.enum';
import { Company } from '../../companies/entities/company.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  active: boolean;

  @Column({
    nullable: true,
  })
  @Exclude()
  password: string;

  @Column({
    default: '',
  })
  firstname: string;

  @Column({
    nullable: true,
    default: '',
  })
  lastname: string;

  @Column({
    default: '',
  })
  patronymic: string;

  @Column({
    nullable: true,
  })
  birthday: string;

  @Column()
  phone: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  phoneConfirm: boolean;

  @OneToMany(() => JwtRefreshToken, (jwtRefreshToken) => jwtRefreshToken.user)
  @Exclude()
  jwtRefreshToken: JwtRefreshToken[];

  /** avatar - start **/
  @Column({
    type: 'uuid',
    nullable: true,
  })
  avatarId: string;

  @OneToOne(() => Upload, {
    eager: true,
  })
  @JoinColumn()
  avatar: Upload;
  /** avatar - end **/

  @Column({
    type: 'enum',
    enum: UserRoles,
    default: UserRoles.USER,
  })
  role: UserRoles;

  @Column({
    nullable: true,
  })
  email: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  emailConfirm: boolean;

  @OneToMany(() => Company, (company) => company.owner, {
    eager: true,
  })
  @JoinTable()
  companies: Company[];
}
