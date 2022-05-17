import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';

import { TABLE } from './users.constants';

@ObjectType()
@Entity(TABLE)
export class UsersEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field()
  @CreateDateColumn({ nullable: true })
  createdAt?: Date;

  @Field()
  @UpdateDateColumn({ nullable: true })
  updatedAt?: Date;

  @Field()
  @Column({ nullable: true })
  email?: string;

  @Field()
  @Column({ type: 'varchar', nullable: true })
  name?: string;
}
