import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './users.entity';

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {
  get repository() {
    return this.repo;
  }

  constructor(@InjectRepository(User) readonly userRepository) {
    super(userRepository);
  }

  async findByLogin({ email, password }: User): Promise<Partial<User>> {
    const user = await this.repo.findOne({ where: { email } });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    const areEqual = await bcrypt.compare(password, user.password);

    if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return { ...user, password };
  }

  async create(@Body() userDto: User): Promise<User> {
    const userInDb = await this.repo.findOne({ where: { email: userDto.email } });

    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    return this.repo.save(this.repo.create(userDto));
  }
}
