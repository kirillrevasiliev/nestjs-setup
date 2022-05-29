import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { IsEmail, IsArray, IsOptional, IsNotEmpty, MinLength, IsEnum } from 'class-validator';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';

import { ROLES, GENDER } from './users.constants';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @CreateDateColumn({ nullable: true })
  createdAt?: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt?: Date;

  @IsNotEmpty()
  @IsEmail()
  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;

  @MinLength(3)
  @Column({ type: 'varchar', nullable: false })
  username: string;

  @IsNotEmpty()
  @MinLength(6)
  @Exclude({ toPlainOnly: true })
  @Column({ type: 'varchar', nullable: false })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @IsArray()
  @IsOptional()
  @IsEnum(ROLES)
  @Column({ type: 'enum', enum: ROLES, array: true, default: [ROLES.MEMBER] })
  roles: ROLES[];

  @IsNotEmpty()
  @IsEnum(GENDER)
  @Column({ type: 'enum', enum: GENDER, nullable: true })
  gender: GENDER;

  @IsOptional()
  @Column({ type: 'boolean', default: false })
  isEmailConfirmed: boolean;
}
