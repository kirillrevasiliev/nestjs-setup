import {Args, Mutation, Resolver, Query} from '@nestjs/graphql';

import {UsersService} from "./users.service";
import {UsersEntity} from "./users.entity";
import {CreateUserInput} from "./dtos/create-user.input";
import {UpdateUserInput} from "./dtos/update-user.input";

@Resolver('User')
export class UsersResolver {
  constructor(
    private readonly userService: UsersService,
  ) {
  }

  @Mutation(() => UsersEntity)
  async createUser(@Args('createUser') createUserInput: CreateUserInput): Promise<UsersEntity> {
    return await this.userService.createUser(createUserInput)
  }

  @Mutation(() => UsersEntity)
  async updateUser(@Args('updateUser') updateUserInput: UpdateUserInput): Promise<UsersEntity> {
    return await this.userService.updateUser(updateUserInput)
  }

  @Mutation(() => UsersEntity)
  async removeUser(@Args('id') id: number): Promise<number> {
    return await this.userService.removeUser(id)
  }

  @Query(() => UsersEntity)
  async getOneUser(@Args('id') id: number): Promise<UsersEntity> {
    return await this.userService.getOneUser(id)
  }

  @Query(() => UsersEntity)
  async getAllUsers(): Promise<UsersEntity[] | null> {
    return await this.userService.getAllUsers()
  }
}
