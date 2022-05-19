import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { UsersEntity } from './users.entity';
import { UpdateDto } from './dtos/update.dto';

@Injectable()
export class UsersService extends TypeOrmCrudService<UsersEntity> {
  constructor(@InjectRepository(UsersEntity) readonly userRepository) {
    super(userRepository);
  }

  async createUser(userInput: UpdateDto): Promise<UsersEntity> {
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

  async updateUser(userData: UpdateDto): Promise<UpdateDto> {
    await this.userRepository.update({ id: userData.id }, { ...userData });
    return await this.getOneUser(userData.id);
  }
}
