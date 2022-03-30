import { UserStatus } from './../constants/user-status.enum';
import { Role } from '../../../common/constants/user-role.enum';
import { Base } from 'src/common/entites/base.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity({ name: 'users' })
export class User extends Base {
  @Index({ unique: true })
  @Column({ type: 'varchar', length: 150, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 100, nullable: true, default: null })
  password: string;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.ACTIVE })
  status: UserStatus;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 150, nullable: true })
  username: string;

  // @Column({ type: 'int4', nullable: true, default: null })
  // company_id: number;

  // @Column({ type: 'varchar', length: 255, nullable: true, default: null })
  // first_name: string;

  // @Column({ type: 'varchar', length: 255, nullable: true, default: null })
  // last_name: string;

  // @Column({ type: 'varchar', length: 20, nullable: true, default: null })
  // mobile: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;
}
