import { Body, ClassSerializerInterceptor, Controller, Post, UseInterceptors } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';

import { Auth } from '@app/auth/decorators/auth.decorator';

import { UsersService } from './users.service';
import { User } from './users.entity';
import { UpdateDto } from './dtos/update.dto';

@Crud({
  model: {
    type: User,
  },
  dto: {
    update: UpdateDto,
  },
  routes: {
    getOneBase: {
      decorators: [Auth()],
    },
    getManyBase: {
      decorators: [Auth()],
    },
    updateOneBase: {
      decorators: [Auth()],
    },
  },
  query: {
    exclude: ['password'],
    sort: [
      {
        field: 'id',
        order: 'ASC',
      },
    ],
  },
})
@Controller('users')
export class UsersController implements CrudController<User> {
  constructor(public service: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(@Body() userData: User) {
    return this.service.create(userData);
  }
}
