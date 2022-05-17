import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UsersEntity } from '@app/users/users.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from '@app/users/dtos/create-user.input';
import { UpdateUserInput } from '@app/users/dtos/update-user.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
  ) {}

  async createUser(userInput: CreateUserInput): Promise<UsersEntity> {
    return await this.userRepository.save({ ...userInput });
  }

  async getOneUser(id: number): Promise<UsersEntity> {
    return await this.userRepository.findOne({ id });
  }

  async getAllUsers(): Promise<UsersEntity[] | null> {
    return await this.userRepository.find();
  }

  async removeUser(id: number): Promise<number> {
    await this.userRepository.delete({ id });
    return id;
  }

  async updateUser(userInput: UpdateUserInput): Promise<UpdateUserInput> {
    await this.userRepository.update({ id: userInput.id }, { ...userInput });
    return await this.getOneUser(userInput.id);
  }
}
