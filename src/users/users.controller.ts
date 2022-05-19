import { Controller, Post, Get, Body, Put, Param } from '@nestjs/common';
import { Crud, CrudController, Override } from '@nestjsx/crud';

import { Auth } from '@app/auth/decorators/auth.decorator';

import { TABLE } from './users.constants';
import { UsersService } from './users.service';
import { UsersEntity } from './users.entity';
import { UpdateDto } from './dtos/update.dto';

@Crud({
  model: {
    type: UsersEntity,
  },
  dto: {
    update: UpdateDto,
  },
})
@Controller(TABLE)
export class UsersController implements CrudController<UsersEntity> {
  constructor(public service: UsersService) {}

  @Auth()
  @Override()
  @Get(':id')
  async get(@Param('id') id): Promise<UsersEntity> {
    return this.service.getOneUser(id);
  }

  @Auth()
  @Post('create')
  async create(@Body() userData: UpdateDto): Promise<UsersEntity> {
    return Promise.resolve(userData);
  }

  @Auth()
  @Put('update')
  async update(@Body() userData: UpdateDto): Promise<UsersEntity> {
    return this.service.updateUser(userData);
  }
}
