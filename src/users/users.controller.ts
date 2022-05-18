import { Controller, Post, Body } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';

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

  @Post('create')
  async create(@Body() userData: UpdateDto): Promise<UsersEntity> {
    return this.service.createUser(userData);
  }
}
