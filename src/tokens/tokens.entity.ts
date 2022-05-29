import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

import { User } from '@app/users/users.entity';

import { TYPE } from './tokens.constants';

@Entity('token')
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
