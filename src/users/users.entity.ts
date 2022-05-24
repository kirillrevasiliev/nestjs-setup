import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { IsEmail } from 'class-validator';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @CreateDateColumn({ nullable: true })
  createdAt?: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt?: Date;

  @IsEmail()
  @Column({ type: 'varchar', unique: true, nullable: true })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  password: string;
}
