import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { Exclude } from 'class-transformer';

import { User } from '@app/user/user.entity';

import { TYPE } from './token.constants';

@Entity('token')
@Unique('token', ['code', 'type', 'user'])
export class Token {
  @PrimaryGeneratedColumn()
  readonly id?: number;

  @Column({ type: 'varchar' })
  code: string;

  @Column({ type: 'enum', enum: TYPE })
  type: TYPE;

  @Column({ type: 'int' })
  userId: number;

  @CreateDateColumn()
  @Exclude()
  createdAt?: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user?: User;
}
